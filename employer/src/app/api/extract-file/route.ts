import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    let extractedText = "";

    try {
      if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
        // Use pdf2json for PDF extraction with proper TypeScript imports
        const PDFParser = (await import("pdf2json")).default;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Create a promise to handle the PDF parsing
        extractedText = await new Promise<string>((resolve, reject) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pdfParser = new (PDFParser as any)(null, true); // Enable raw text mode

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pdfParser.on("pdfParser_dataError", (errData: any) => {
            reject(
              new Error(
                `PDF parsing failed: ${
                  errData.parserError?.message || "Unknown error"
                }`
              )
            );
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
            try {
              let text = "";

              // Extract text from each page - using correct structure from pdf2json
              if (pdfData.Pages && Array.isArray(pdfData.Pages)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
                pdfData.Pages.forEach((page: any, pageIndex: number) => {
                  if (page.Texts && Array.isArray(page.Texts)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    page.Texts.forEach((textItem: any) => {
                      if (textItem.R && Array.isArray(textItem.R)) {
                        textItem.R.forEach((run: any) => {
                          if (run.T) {
                            try {
                              // Decode URI component and add space
                              const decodedText = decodeURIComponent(run.T);
                              text += decodedText + " ";
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            } catch (decodeError: any) {
                              // If decoding fails, use the raw text
                              text += run.T + " ";
                            }
                          }
                        });
                      }
                    });
                    text += "\n"; // Add newline after each page
                  }
                });
              } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                console.warn(
                  "No Pages found in PDF data or Pages is not an array"
                );

                // Try alternative approach using getRawTextContent if available
                if (typeof pdfParser.getRawTextContent === "function") {
                  text = pdfParser.getRawTextContent();
                }
              }

              if (!text.trim()) {
                reject(
                  new Error("No text content could be extracted from the PDF")
                );
                return;
              }

              resolve(text.trim());
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (parseError: any) {
              console.error("PDF content parsing error:", parseError);
              reject(
                new Error(`Failed to parse PDF content: ${parseError.message}`)
              );
            }
          });

          // Parse the PDF buffer
          try {
            pdfParser.parseBuffer(buffer);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (bufferError: any) {
            console.error("PDF buffer parsing error:", bufferError);
            reject(
              new Error(`Failed to parse PDF buffer: ${bufferError.message}`)
            );
          }
        });
      } else if (
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileName.endsWith(".docx") ||
        fileType === "application/msword"
      ) {
        // Handle Word documents with dynamic import and correct options
        const mammoth = (await import("mammoth")).default;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
      } else if (fileType === "text/plain") {
        // Handle plain text files
        extractedText = await file.text();
      } else {
        return NextResponse.json(
          {
            error:
              "Unsupported file type. Please upload PDF, DOCX, DOC, or TXT files.",
          },
          { status: 400 }
        );
      }

      if (!extractedText.trim()) {
        return NextResponse.json(
          { error: "No text could be extracted from the file" },
          { status: 400 }
        );
      }

      // Clean up the extracted text
      extractedText = extractedText
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .trim();

      return NextResponse.json({
        text: extractedText,
        filename: file.name,
        fileSize: file.size,
        fileType: fileType,
        wordCount: extractedText.split(/\s+/).length,
      });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (extractionError: any) {
      console.error("Text extraction error:", extractionError);
      return NextResponse.json(
        { error: `Text extraction failed: ${extractionError.message}` },
        { status: 400 }
      );
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Failed to process file upload" },
      { status: 500 }
    );
  }
}
