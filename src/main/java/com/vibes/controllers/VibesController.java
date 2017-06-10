package com.vibes.controllers;

import com.google.gson.Gson;
import com.vibes.dto.SongInfo;
import com.vibes.util.UrlUtil;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Calendar;

@RestController
@RequestMapping("/vibes")
public class VibesController {

    @RequestMapping("/")
    public String index() {
        return "Greetings from Vibes server";
    }

    @RequestMapping(value = "/image", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public byte [] getSongImage(@RequestParam("channelName") String channelName) throws IOException {
        URL url = new URL("http://104.131.151.101/" + channelName + "/image.jpg?" + Calendar.getInstance().getTime().getTime());
        BufferedImage image = ImageIO.read(url);

        ByteArrayOutputStream baos=new ByteArrayOutputStream();
        ImageIO.write(image, "jpg", baos);

        return baos.toByteArray();
    }

    @RequestMapping(value = "/songinfo", method = RequestMethod.GET)
    public SongInfo getSongInfo(@RequestParam("channelName") String channelName) throws Exception {
        String url = "http://104.131.151.101/" + channelName + "/songinfo.txt?" + Calendar.getInstance().getTime().getTime();
        Gson gson = new Gson();

        return gson.fromJson(UrlUtil.readUrl(url), SongInfo.class);
    }
}