#!/usr/bin/env bash
# Proxmark3 setup script — builds from source and configures USB access
set -euo pipefail

PM3_DIR="${HOME}/proxmark3"
REPO_URL="https://github.com/RfidResearchGroup/proxmark3.git"

check_root() {
    if [[ $EUID -eq 0 ]]; then
        echo "Do not run this script as root. sudo will be called where needed."
        exit 1
    fi
}

install_deps() {
    echo "[*] Installing build dependencies..."
    sudo apt-get update -qq
    sudo apt-get install -y --no-install-recommends \
        git \
        build-essential \
        gcc-arm-none-eabi \
        libnewlib-arm-none-eabi \
        libssl-dev \
        libgd-dev \
        pkg-config \
        libreadline-dev \
        libusb-1.0-0-dev \
        libqt5widgets5 \
        qtbase5-dev \
        libpython3-dev \
        python3 \
        python3-pip \
        cmake \
        curl \
        wget \
        xxd
}

clone_or_update() {
    if [[ -d "${PM3_DIR}/.git" ]]; then
        echo "[*] Proxmark3 repo already cloned — pulling latest..."
        git -C "${PM3_DIR}" pull --ff-only
    else
        echo "[*] Cloning Proxmark3 repository..."
        git clone --depth 1 "${REPO_URL}" "${PM3_DIR}"
    fi
}

build() {
    echo "[*] Building Proxmark3 client and firmware..."
    cd "${PM3_DIR}"

    # Detect which platform tag to use
    if [[ -f /etc/os-release ]]; then
        # shellcheck disable=SC1091
        source /etc/os-release
        DISTRO="${ID:-linux}"
    else
        DISTRO="linux"
    fi

    case "${DISTRO}" in
        ubuntu|debian|raspbian)
            make clean
            make -j"$(nproc)" all
            ;;
        arch|manjaro)
            make clean
            make -j"$(nproc)" all
            ;;
        *)
            echo "[!] Unrecognised distro '${DISTRO}' — attempting generic build."
            make clean
            make -j"$(nproc)" all
            ;;
    esac
}

install_udev() {
    echo "[*] Installing udev rules for USB access..."
    RULES_SRC="${PM3_DIR}/driver/77-mm-usb-device-blacklist.rules"
    RULES_DEST="/etc/udev/rules.d/77-proxmark3.rules"

    if [[ -f "${RULES_SRC}" ]]; then
        sudo cp "${RULES_SRC}" "${RULES_DEST}"
    else
        # Fallback: write minimal rules that cover the common Proxmark3 USB IDs
        sudo tee "${RULES_DEST}" > /dev/null <<'UDEV'
# Proxmark3 — RDV4 / Easy / generic variants
SUBSYSTEM=="usb", ATTRS{idVendor}=="2d2d", ATTRS{idProduct}=="504d", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="9ac4", ATTRS{idProduct}=="4b8f", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="tty", ATTRS{idVendor}=="2d2d", ATTRS{idProduct}=="504d", MODE="0666", GROUP="plugdev"
UDEV
    fi

    sudo udevadm control --reload-rules
    sudo udevadm trigger

    # Ensure the current user is in plugdev
    if ! groups | grep -q plugdev; then
        echo "[*] Adding ${USER} to plugdev group..."
        sudo usermod -aG plugdev "${USER}"
        echo "[!] Group change takes effect on next login — re-login or run: newgrp plugdev"
    fi
}

install_client() {
    echo "[*] Installing proxmark3 client to /usr/local/bin..."
    sudo make -C "${PM3_DIR}" install
}

print_usage() {
    echo ""
    echo "=== Proxmark3 setup complete ==="
    echo ""
    echo "Connect your Proxmark3 via USB, then:"
    echo "  pm3                          # auto-detect port"
    echo "  pm3 -p /dev/ttyACM0          # specify port explicitly"
    echo ""
    echo "Useful first commands inside the pm3 shell:"
    echo "  hw version                   # show firmware version"
    echo "  hw status                    # device health check"
    echo "  hf search                    # scan for HF (13.56 MHz) cards"
    echo "  lf search                    # scan for LF (125 kHz) cards"
    echo ""
    echo "To flash firmware:"
    echo "  pm3-flash-all                # flash bootrom + fullimage"
    echo ""
    echo "Docs: https://github.com/RfidResearchGroup/proxmark3/tree/master/doc"
}

main() {
    check_root
    install_deps
    clone_or_update
    build
    install_udev
    install_client
    print_usage
}

main "$@"
