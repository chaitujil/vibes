# Vibes radio app

Telugu radio app similar to pandora

## How to build

```
npm install -g ionic
ionic serve
```

Those above steps should open a browser that runs bindas app

## How to create a signed apk
Don't change id in config.xml once uploaded to google play store.
Change version in config.xml from YY to YY+1

```
version="0.0.YY"
android-versionCode="YY"
```

## cd to the project folder and build an unsigned apk. In my case

```
cd C:\vibes
ionic build --release android
```

## Use jarsigner to sign the apk

```
cd to the unsigned apk location
"C:\Program Files\Java\jdk1.8.0_71\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../../../vibes-release-key.keystore android-release-unsigned.apk vibes
```

## Use zipalign to optimize the apk
```
C:\Users\cheddi\AppData\Local\Android\sdk\build-tools\23.0.3\zipalign.exe -v 4 vibes.apk vibes-aligned.apk
```

## Upload the aligned apk to google play store.

## How to set song metadata

1. Download movie songs into a movie folder.
2. Run filename_convert script at both folder level and songs level.
3. Download mp3tag software.
4. File -> Change directory -> Select movie directory.
5. View -> extended tags -> remove unnecessary tags.
6. Modify title string to appropriate.
7. Remove cover with water mark , download cover to the same folder, select all songs right click and add cover.
