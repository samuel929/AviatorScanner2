package com.aviatorscanner

import android.os.Bundle
import androidx.core.view.WindowCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "AviatorScanner"

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): ReactRootView {
                return ReactRootView(context)
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        // ⚡ Enable edge-to-edge manually
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(null)
    }
}
