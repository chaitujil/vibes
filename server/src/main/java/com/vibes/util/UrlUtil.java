package com.vibes.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

public class UrlUtil {
    public static String readUrl(String urlString) throws Exception {
        BufferedReader reader = null;
        try {
            URL url = new URL(urlString);
            reader = new BufferedReader(new InputStreamReader(url.openStream()));
            StringBuilder sb = new StringBuilder();
            int read;
            char[] chars = new char[1024];
            while ((read = reader.read(chars)) != -1)
                sb.append(chars, 0, read);

            return sb.toString();
        } finally {
            if (reader != null)
                reader.close();
        }
    }
}
