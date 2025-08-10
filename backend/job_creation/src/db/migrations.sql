-- Database migration for Upzella Job Creation Module
-- Run this script in your Supabase SQL editor

-- Create jobs table
create table if not exists jobs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  title text not null,
  description text not null,
  skills_required text[] not null,
  work_type text[] not null, -- Full-time, Part-time, Remote, Hybrid, etc.
  employment_type text not null, -- Permanent, Contract, Internship
  experience_min int not null,
  experience_max int not null,
  resume_threshold int not null default 60, -- default 60%
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create resume_scoring_weights table
create table if not exists resume_scoring_weights (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references jobs(id) on delete cascade,
  section_name text not null, -- Education, Experience, etc.
  criteria_description text,
  weightage int not null, -- % value, sum across all = 100
  created_at timestamptz default now()
);

-- Create ai_models table
create table if not exists ai_models (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references employers(id) on delete cascade,
  model_name text not null,
  provider text not null,
  configs jsonb not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table jobs enable row level security;
alter table resume_scoring_weights enable row level security;
alter table ai_models enable row level security;

-- Drop existing policies
drop policy if exists "Users can view jobs from their company" on jobs;
drop policy if exists "Users can insert jobs for their company" on jobs;
drop policy if exists "Users can update jobs from their company" on jobs;
drop policy if exists "Users can delete jobs from their company" on jobs;

drop policy if exists "Users can view scoring weights for their company jobs" on resume_scoring_weights;
drop policy if exists "Users can insert scoring weights for their company jobs" on resume_scoring_weights;
drop policy if exists "Users can update scoring weights for their company jobs" on resume_scoring_weights;
drop policy if exists "Users can delete scoring weights for their company jobs" on resume_scoring_weights;

drop policy if exists "Users can view their AI models" on ai_models;
drop policy if exists "Users can insert their AI models" on ai_models;
drop policy if exists "Users can update their AI models" on ai_models;
drop policy if exists "Users can delete their AI models" on ai_models;

-- Jobs table policies
create policy "Users can view jobs from their company" on jobs
  for select using (
    company_id in (select company_id from employers where id = auth.uid())
  );

create policy "Users can insert jobs for their company" on jobs
  for insert with check (
    company_id in (select company_id from employers where id = auth.uid())
  );

create policy "Users can update jobs from their company" on jobs
  for update using (
    company_id in (select company_id from employers where id = auth.uid())
  );

create policy "Users can delete jobs from their company" on jobs
  for delete using (
    company_id in (select company_id from employers where id = auth.uid())
  );

-- Resume scoring weights policies
create policy "Users can view scoring weights for their company jobs" on resume_scoring_weights
  for select using (
    job_id in (select id from jobs where company_id in (
      select company_id from employers where id = auth.uid()
    ))
  );

create policy "Users can insert scoring weights for their company jobs" on resume_scoring_weights
  for insert with check (
    job_id in (select id from jobs where company_id in (
      select company_id from employers where id = auth.uid()
    ))
  );

create policy "Users can update scoring weights for their company jobs" on resume_scoring_weights
  for update using (
    job_id in (select id from jobs where company_id in (
      select company_id from employers where id = auth.uid()
    ))
  );

create policy "Users can delete scoring weights for their company jobs" on resume_scoring_weights
  for delete using (
    job_id in (select id from jobs where company_id in (
      select company_id from employers where id = auth.uid()
    ))
  );

-- AI models policies
create policy "Users can view their AI models" on ai_models
  for select using (user_id = auth.uid() or user_id is null);

create policy "Users can insert their AI models" on ai_models
  for insert with check (user_id = auth.uid());

create policy "Users can update their AI models" on ai_models
  for update using (user_id = auth.uid());

create policy "Users can delete their AI models" on ai_models
  for delete using (user_id = auth.uid());

-- Indexes
create index if not exists idx_jobs_company_id on jobs(company_id);
create index if not exists idx_jobs_created_at on jobs(created_at desc);
create index if not exists idx_resume_scoring_weights_job_id on resume_scoring_weights(job_id);
create index if not exists idx_ai_models_user_id on ai_models(user_id);

-- Use 'company' bucket for job descriptions folder
insert into storage.buckets (id, name, public)
values ('company', 'company', true)
on conflict (id) do nothing;

-- Storage policies for job description uploads
create policy "Authenticated users can upload job descriptions"
on storage.objects for insert
with check (
  bucket_id = 'company'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = 'job_descriptions'
);

create policy "Public read access to job descriptions"
on storage.objects for select
using (
  bucket_id = 'company'
  and (storage.foldername(name))[1] = 'job_descriptions'
);

-- updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
drop trigger if exists update_jobs_updated_at on jobs;
create trigger update_jobs_updated_at
  before update on jobs
  for each row
  execute function update_updated_at_column();

-- Validate resume scoring weights function
create or replace function validate_resume_scoring_weights()
returns trigger as $$
declare
  total_weightage int;
begin
  select coalesce(sum(weightage), 0) into total_weightage
  from resume_scoring_weights
  where job_id = new.job_id
    and id <> coalesce(new.id, uuid_nil());

  total_weightage := total_weightage + new.weightage;

  if total_weightage > 100 then
    raise exception 'Total resume scoring weightage cannot exceed 100%% (current: %)', total_weightage;
  end if;

  return new;
end;
$$ language plpgsql;

-- Trigger for resume scoring validation
drop trigger if exists validate_resume_weightage on resume_scoring_weights;
create trigger validate_resume_weightage
  before insert or update on resume_scoring_weights
  for each row
  execute function validate_resume_scoring_weights();
