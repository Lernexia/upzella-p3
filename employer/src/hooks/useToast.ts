import { useToast as useToastContext } from '@/context/ToastContext'

export const useToast = () => {
  const { addToast, removeToast, clearAll } = useToastContext()

  const toast = {
    success: (title: string, description?: string, duration?: number) => {
      addToast({ type: 'success', title, description, duration })
    },
    error: (title: string, description?: string, duration?: number) => {
      addToast({ type: 'error', title, description, duration })
    },
    warning: (title: string, description?: string, duration?: number) => {
      addToast({ type: 'warning', title, description, duration })
    },
    info: (title: string, description?: string, duration?: number) => {
      addToast({ type: 'info', title, description, duration })
    },
    custom: (title: string, description?: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration?: number) => {
      addToast({ type, title, description, duration })
    }
  }

  return {
    toast,
    dismiss: removeToast,
    dismissAll: clearAll
  }
}

export default useToast
