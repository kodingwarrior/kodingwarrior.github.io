require 'vips'

module Utils
  module Opengraph
    class Image
      attr_reader :elements, :canvas, :borders, :canvas_color

      def initialize(width, height, color: '#ffffff')
        @elements = []
        @canvas_color = color
        @canvas = Vips::Image.black(width, height).ifthenelse([0, 0, 0], hex_to_rgb(color))
        @borders = {}
      end

      def image(source, resize_with_ratio:)
        im = source ? Vips::Image.new_from_buffer(source, '') : Vips::Image.black(1, 1).ifthenelse([0, 0, 0], hex_to_rgb(canvas_color))
        if resize_with_ratio && source
          width, height = resize_with_ratio
          ratio = get_ratio(im, width, height, :min)
          im = im.resize(ratio)
        end
        @elements << im
        self
      end

      def text(message, width:, height:, dpi: 300, color: '#2f363d', font: 'Open Sans Bold', font_size: 12)
        font_size = font_size || 12 # Default font size if not specified
        im = Vips::Image.text(message, width: width, height: height, dpi: dpi, font: "#{font}:#{font_size}")
        im = Vips::Image.text(message, width: width, height: height, dpi: dpi, font: font)
        im = im.new_from_image(hex_to_rgb(color)).copy(interpretation: :srgb).bandjoin(im)
        @elements << im

        self
      end

      def border_bottom(height, color: '#000000')
        im = Vips::Image.black(canvas.width, height).ifthenelse([0, 0, 0], hex_to_rgb(color))
        borders[:bottom] = im

        self
      end

      def compose(filename)
        result = yield(canvas, *elements)
        @canvas = @canvas.composite(
          elements + [borders[:bottom]], :over,
          x: result[:x] + (borders[:bottom] ? [0] : []),
          y: result[:y] + (borders[:bottom] ? [canvas.height - borders[:bottom].height] : [])
        )

        @canvas.write_to_file(filename)
      end

      private

      def hex_to_rgb(input)
        case input
        when String
          input.match(/#(..)(..)(..)/)[1..3].map(&:hex)
        when Array
          input
        else
          raise ArgumentError, "Unknown input #{input.inspect}"
        end
      end

      # https://github.com/dariocravero/vips-process/blob/master/lib/vips-process/resize.rb#L109
      def get_ratio(image, width, height, min_or_max = :min)
        width_ratio = width.to_f / image.width
        height_ratio = height.to_f / image.height
        [width_ratio, height_ratio].send min_or_max
      end
    end
  end
end
