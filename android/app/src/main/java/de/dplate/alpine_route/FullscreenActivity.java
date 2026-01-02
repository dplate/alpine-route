package de.dplate.alpine_route;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.Window;
import android.webkit.MimeTypeMap;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static android.webkit.WebSettings.LOAD_NO_CACHE;

public class FullscreenActivity extends AppCompatActivity {
    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();
        WindowInsetsControllerCompat insetsController = WindowCompat.getInsetsController(window, window.getDecorView());
        insetsController.hide(WindowInsetsCompat.Type.systemBars());
        insetsController.setSystemBarsBehavior(
                WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        );

        setContentView(R.layout.activity_fullscreen);

        WebView webView = findViewById(R.id.activity_main_webview);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setCacheMode(LOAD_NO_CACHE);
        webSettings.setSupportZoom(false);
        webSettings.setBuiltInZoomControls(false);
        webSettings.setDisplayZoomControls(false);
        webSettings.setGeolocationEnabled(false);
        webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NORMAL);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setDomStorageEnabled(true);

        final Map<String, String> mimeTypes = new HashMap<>();
        mimeTypes.put("js", "text/javascript");
        mimeTypes.put("html", "text/html");
        mimeTypes.put("css", "text/css");
        mimeTypes.put("svg", "image/svg+xml");
        mimeTypes.put("png", "image/png");
        mimeTypes.put("ico", "image/x-icon");
        mimeTypes.put("webp", "image/webp");
        mimeTypes.put("ttf", "font/ttf");

        final String dummyUrl = "file://" + getCacheDir().getAbsolutePath() + "/";

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                String extension = MimeTypeMap.getFileExtensionFromUrl(url);
                String path = "www/" + url.substring(dummyUrl.length());
                if (mimeTypes.containsKey(extension)) {
                    try {
                        return new WebResourceResponse(mimeTypes.get(extension), "UTF-8", getAssets().open(path));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                return null;
            }
        });
        webView.loadUrl(dummyUrl + "index.html");
    }
}