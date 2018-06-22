from urllib.request import urlretrieve
from os.path import exists
from os import listdir

LINKS_FILE = 'links.txt'

def hasPdfFiles():
    for f in listdir('.'):
        if ('pdf' in f): return True
    return False

def main():
    # ----
    if (exists(LINKS_FILE) and not hasPdfFiles()):
        print('file exists')
        f = open(LINKS_FILE, 'r')
        files = [ line.replace('\n', '') for line in f.readlines() ]
        f.close()
        for file in files:
            print("Downloading: {0}".format(file))
            urlretrieve(file, file.split('/')[-1])
    else:
        print('no file')
    return 0


if __name__ == '__main__':
    main()
