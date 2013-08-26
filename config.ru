$stdout.sync = true

use Rack::Static,
  :urls => ["/css", "/js", "/images", "/fonts", "/assets"],
  :root => "."

map '/' do
  run lambda { |env|
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open('index.html', File::RDONLY)
    ]
  }
end

map '/thankyou' do
  run lambda { |env|
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open('thankyou.html', File::RDONLY)
    ]
  }
end