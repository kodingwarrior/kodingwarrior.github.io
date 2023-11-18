class Utils::ClusterVisualizer
  def initialize
    @coordinates = []
    @links = []
  end

  # Applied Sunflower Seed Arrangements
  #
  # See https://demonstrations.wolfram.com/SunflowerSeedArrangements/
  def convert(node, coordinates, base_theta, radius)
    @coordinates << { id: "##{node[:name]}", fx: coordinates[:fx], fy: coordinates[:fy], group: 2 }
    return if node[:children].empty?

    phi = (1.0 + Math.sqrt(5)) / 2.0

    angle_stride = 2.0 * Math::PI / (phi ** 2)

    node[:children].each_with_index do |child, k|
      theta = base_theta + k * angle_stride

      point = {
        fx: coordinates[:fx] + radius * Math.cos(theta),
        fy: coordinates[:fy] + radius * Math.sin(theta),
      }

      convert(child, { fx: point[:fx], fy: point[:fy] }, theta, radius * (2.0/5.0))

      @links << { "source": "##{node[:name]}", "target": "##{child[:name]}", value: 200 }
    end

    [@coordinates, @links]
  end

  class << self
    def calculate_coordinates(root_node)
      self.new.convert(root_node, { fx: 0, fy: 0 }, 0, 200)
    end
  end
end
