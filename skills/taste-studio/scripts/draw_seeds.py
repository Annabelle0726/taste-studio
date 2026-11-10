"""Draw distinct ideation cues for one design comparison."""
import argparse
import secrets


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("count", type=int, choices=(3, 4), nargs="?", default=3)
    count = parser.parse_args().count
    drawn = set()
    while len(drawn) < count:
        seed = secrets.token_hex(12)
        if seed not in drawn:
            drawn.add(seed)
            print(seed)


if __name__ == "__main__":
    main()