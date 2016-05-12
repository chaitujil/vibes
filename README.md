cd # vibes
Vibes radio app

Telugu radio app similar to pandora

# How to create a signed apk
Don't change id in config.xml once uploaded to google play store.
Change version in config.xml from x.x.version to x.x.version+1

# cd to the project folder and build an unsigned apk. In my case
cd C:\vibes
ionic build --release android

# Use jarsigner to sign the apk
cd to the unsigned apk location
"C:\Program Files\Java\jdk1.8.0_71\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../../../vibes-release-key.keystore android-release-unsigned.apk vibes

# Use zipalign to optimize the apk
C:\Users\cheddi\AppData\Local\Android\sdk\build-tools\23.0.3\zipalign.exe -v 4 vibes.apk vibes-aligned.apk

# Upload the aligned apk to google play store.
