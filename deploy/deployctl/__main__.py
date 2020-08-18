#!/usr/bin/env python3

import argparse
import sys

from deployctl.subcommands import browser_deployments
from deployctl.subcommands import browser_images
from deployctl.subcommands import config
from deployctl.subcommands import ingress_demo
from deployctl.subcommands import ingress_production
from deployctl.subcommands import reads_deployments
from deployctl.subcommands import reads_images
from deployctl.subcommands import setup


def main():
    parser = argparse.ArgumentParser(prog="deployctl")

    subcommands = {
        "config": config,
        "deployments": browser_deployments,
        "images": browser_images,
        "reads-deployments": reads_deployments,
        "reads-images": reads_images,
        "production": ingress_production,
        "demo": ingress_demo,
        "setup": setup,
    }

    parser.add_argument("subcommand", choices=list(subcommands.keys()))

    args = parser.parse_args(sys.argv[1:2])

    subcommand = subcommands[args.subcommand]
    subcommand.main(sys.argv[2:])


if __name__ == "__main__":
    main()