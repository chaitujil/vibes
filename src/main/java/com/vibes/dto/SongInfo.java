package com.vibes.dto;

import org.springframework.stereotype.Component;

@Component
public class SongInfo {
    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getTrack() {
        return track;
    }

    public void setTrack(String track) {
        this.track = track;
    }

    private String artist;
    private String track;
}
