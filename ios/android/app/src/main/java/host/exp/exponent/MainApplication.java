package host.exp.exponent;


import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import expolib_v1.okhttp3.OkHttpClient;

// import com.facebook.react.ReactApplication;
import me.listenzz.modal.TranslucentModalReactPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
//import com.dylanvann.fastimage.FastImageViewPackage;

// react-native-wechat
import com.theweflex.react.WeChatPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
//react-native-image
import com.imagepicker.ImagePickerPackage;

public class MainApplication extends ExpoApplication  {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add native modules!

        // Needed for `react-native link`
        // new MainReactPackage(),
            new TranslucentModalReactPackage(),
            new PickerPackage(),
          //new FastImageViewPackage(),
            new WeChatPackage(),
            new RNFSPackage(),
            new ImagePickerPackage()

    );
  }

  @Override
  public String gcmSenderId() {
    return getString(R.string.gcm_defaultSenderId);
  }

  @Override
  public boolean shouldUseInternetKernel() {
    return BuildVariantConstants.USE_INTERNET_KERNEL;
  }

  public static OkHttpClient.Builder okHttpClientBuilder(OkHttpClient.Builder builder) {
    // Customize/override OkHttp client here
    return builder;
  }
}
