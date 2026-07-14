#!/usr/bin/env bash
# Flash Proxmark3 firmware — bootrom + fullimage
set -euo pipefail

PM3_DIR="${HOME}/proxmark3"
PORT="${1:-}"  # optional: pass port as first arg, e.g. /dev/ttyACM0

if [[ ! -d "${PM3_DIR}" ]]; then
    echo "[!] Proxmark3 source not found at ${PM3_DIR}."
    echo "    Run setup.sh first."
    exit 1
fi

# Locate firmware images
BOOTROM=$(find "${PM3_DIR}" -name "bootrom.elf" 2>/dev/null | head -1)
FULLIMAGE=$(find "${PM3_DIR}" -name "fullimage.elf" 2>/dev/null | head -1)

if [[ -z "${BOOTROM}" || -z "${FULLIMAGE}" ]]; then
    echo "[!] Firmware images not found — did the build complete?"
    exit 1
fi

echo "[*] Bootrom:   ${BOOTROM}"
echo "[*] Fullimage: ${FULLIMAGE}"
echo ""
echo "[*] Entering bootloader mode — hold the button on the Proxmark3 while"
echo "    connecting USB, or run 'hw ping' then quickly replug..."
echo ""

if [[ -n "${PORT}" ]]; then
    pm3-flash -p "${PORT}" -b "${BOOTROM}"
    pm3-flash -p "${PORT}" "${FULLIMAGE}"
else
    pm3-flash-bootrom
    pm3-flash-fullimage
fi

echo "[*] Flash complete. Unplug and replug the Proxmark3."
