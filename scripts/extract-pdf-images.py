#!/usr/bin/env python3
"""Extract embedded raster images from a PDF into a directory.

Usage:
  python scripts/extract-pdf-images.py input.pdf output-directory

The original image names are preserved. Numbering is ordered by each image's
first placement on the PDF page so the output follows the designed reading
order rather than the PDF object-stream order.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

import pdfplumber
from pypdf import PdfReader


def natural_key(value: str) -> list[object]:
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", value)]


def ordered_names(pdf_path: Path) -> list[str]:
    names: list[str] = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            placed = sorted(
                page.images,
                key=lambda item: (round(float(item["top"]), 2), round(float(item["x0"]), 2)),
            )
            for image in placed:
                name = str(image.get("name", ""))
                if name and name not in names:
                    names.append(name)
    return names


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    args.output.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(args.pdf)
    embedded: dict[str, object] = {}

    for page in reader.pages:
        for image in page.images:
            stem = Path(image.name).stem
            embedded[stem] = image.image

    order = ordered_names(args.pdf)
    remaining = sorted((name for name in embedded if name not in order), key=natural_key)
    names = [*order, *remaining]

    for index, name in enumerate(names, start=1):
        image = embedded[name]
        source = args.pdf.stem
        safe_source = re.sub(r'[\\/:*?"<>|]', "-", source)
        output = args.output / f"{index:02d}-{safe_source}-{name.lower()}.png"
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA")
        image.save(output)
        print(f"{output.name}: {image.width}x{image.height}")

    print(f"\nExtracted {len(names)} images to {args.output}")


if __name__ == "__main__":
    main()
