# Proxmark3 Setup

Scripts for building, installing, and flashing a Proxmark3 on Linux (Ubuntu/Debian/Arch).

## Quick Start

```bash
chmod +x setup.sh flash.sh
./setup.sh
```

`setup.sh` does the following in order:

| Step | What it does |
|------|-------------|
| Install deps | `apt-get` packages needed to build the client and ARM firmware |
| Clone repo | Pulls `RfidResearchGroup/proxmark3` into `~/proxmark3` |
| Build | Compiles client + firmware with `make -j$(nproc)` |
| udev rules | Writes USB permission rules so non-root users can access the device |
| Install | Copies `pm3`, `pm3-flash-*` binaries to `/usr/local/bin` |

## Requirements

- Linux (Ubuntu 20.04+ / Debian 11+ / Arch)
- `sudo` access for package install, udev, and `make install`
- ARM cross-compiler (`gcc-arm-none-eabi`) — installed automatically

## After Setup

Plug in the Proxmark3, then:

```bash
pm3                    # auto-detect device port
pm3 -p /dev/ttyACM0   # or specify port explicitly
```

Inside the `pm3` shell:

```
hw version      # confirm firmware matches client
hf search       # scan for 13.56 MHz (HF) cards
lf search       # scan for 125 kHz (LF) cards
```

## Flashing Firmware

Run `flash.sh` when you need to update firmware:

```bash
./flash.sh               # auto-detect port
./flash.sh /dev/ttyACM0  # explicit port
```

Hold the button on the Proxmark3 while plugging in USB to enter bootloader mode before flashing.

## Troubleshooting

**Permission denied on `/dev/ttyACM0`**
```bash
sudo usermod -aG plugdev $USER   # then re-login
```

**Device not detected**
```bash
lsusb | grep -i proxmark
dmesg | tail -20
```

**Build fails with ARM toolchain errors**
```bash
sudo apt-get install gcc-arm-none-eabi libnewlib-arm-none-eabi
```

## Resources

- [Official Proxmark3 RDV4 docs](https://github.com/RfidResearchGroup/proxmark3/tree/master/doc)
- [Proxmark3 wiki](https://github.com/RfidResearchGroup/proxmark3/wiki)
