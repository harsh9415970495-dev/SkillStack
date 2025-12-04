# backend/routes/pdf_routes.py
from fastapi import APIRouter, Response, HTTPException
from pydantic import BaseModel
import time
import asyncio
from utils.pdf_helper import generate_pdf_bytes, generate_html_preview

router = APIRouter()

class PDFRequest(BaseModel):
    template_id: int
    data: dict


# -------------------------
# GENERATE PDF (FIXED)
# -------------------------
@router.post("/generate")
async def api_generate_pdf(req: PDFRequest):
    try:
        # Run heavy PDF generation in a background thread (prevents async blocking)
        pdf_bytes = await asyncio.to_thread(
            generate_pdf_bytes,
            req.template_id,
            req.data
        )

        # Validate output
        if not pdf_bytes:
            raise HTTPException(500, "PDF generation failed (empty output).")

        headers = {
            "Content-Disposition": f'attachment; filename="resume_{int(time.time())}.pdf"',
            "Cache-Control": "no-store",
        }

        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers=headers
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------
# HTML PREVIEW
# -------------------------
@router.post("/preview")
async def api_preview_html(req: PDFRequest):
    try:
        html = generate_html_preview(req.template_id, req.data)

        return Response(
            content=html,
            media_type="text/html",
            headers={"Cache-Control": "no-store"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
