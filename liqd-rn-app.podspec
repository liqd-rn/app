require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
    s.name         = 'liqd-rn-app'
    s.version      = package['version']
    s.summary      = package['description']
    s.license      = package['license']

    s.authors      = package['author']
    s.homepage     = package['homepage']
    s.platforms    = { :ios => '11.0' }
    s.source       = { :git => 'https://github.com/liqd-rn/app.git', :tag => s.version }
    s.source_files = 'dist/**/*.{h,m,mm,swift,cpp,c}'
    s.requires_arc = true
  
    # Peer dependencies declared in your package.json
    s.dependency 'RNScreens'
    s.dependency 'RNGestureHandler'
    #s.dependency 'react-native-safe-area-context'
    s.dependency 'RNReanimated'
  end
  