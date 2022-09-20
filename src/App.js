import React, { useState } from 'react';
import './style.css';
import lz from 'lz-string';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function App() {
  const [chartData, setChartData] = useState([]);
  React.useEffect(() => {
    const str = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna nunc id cursus metus aliquam eleifend mi. Lectus nulla at volutpat diam ut venenatis tellus. Convallis aenean et tortor at risus. Amet facilisis magna etiam tempor orci eu. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Leo urna molestie at elementum. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. A cras semper auctor neque vitae tempus quam pellentesque nec. Id porta nibh venenatis cras. Enim tortor at auctor urna nunc id cursus metus aliquam. Arcu risus quis varius quam quisque id diam vel. Eros in cursus turpis massa tincidunt dui ut. Pharetra diam sit amet nisl suscipit. Blandit aliquam etiam erat velit scelerisque in dictum non. Amet commodo nulla facilisi nullam vehicula. Auctor augue mauris augue neque gravida in fermentum et sollicitudin. Dui ut ornare lectus sit amet est.

    Laoreet id donec ultrices tincidunt arcu. Id semper risus in hendrerit. Enim neque volutpat ac tincidunt. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Pulvinar etiam non quam lacus suspendisse faucibus interdum. Fermentum iaculis eu non diam phasellus vestibulum. Tristique nulla aliquet enim tortor at. Tempor id eu nisl nunc mi. Natoque penatibus et magnis dis. Dignissim cras tincidunt lobortis feugiat vivamus at. Nunc mattis enim ut tellus. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Tellus id interdum velit laoreet. Elit ut aliquam purus sit.
    
    Proin nibh nisl condimentum id venenatis a condimentum. Lobortis mattis aliquam faucibus purus in massa tempor. Tortor consequat id porta nibh venenatis cras. Augue interdum velit euismod in pellentesque. Semper auctor neque vitae tempus quam pellentesque. Venenatis lectus magna fringilla urna porttitor rhoncus dolor. Amet tellus cras adipiscing enim eu turpis egestas pretium aenean. Curabitur vitae nunc sed velit dignissim. Amet venenatis urna cursus eget. Purus faucibus ornare suspendisse sed nisi lacus sed. Placerat orci nulla pellentesque dignissim enim sit amet venenatis.
    
    Maecenas ultricies mi eget mauris pharetra et. Nisl rhoncus mattis rhoncus urna neque viverra justo nec. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Purus sit amet luctus venenatis lectus magna fringilla. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Lectus nulla at volutpat diam. Ut consequat semper viverra nam libero justo laoreet sit amet. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. A arcu cursus vitae congue. Tristique senectus et netus et malesuada fames ac turpis egestas. Habitasse platea dictumst quisque sagittis. Elementum sagittis vitae et leo duis ut diam quam.
    
    Leo vel orci porta non pulvinar neque laoreet suspendisse interdum. Eu augue ut lectus arcu bibendum at varius vel pharetra. Sed vulputate odio ut enim blandit volutpat maecenas volutpat. Venenatis tellus in metus vulputate. Auctor elit sed vulputate mi sit amet mauris. Adipiscing tristique risus nec feugiat in fermentum posuere. Diam maecenas ultricies mi eget mauris. Consectetur adipiscing elit duis tristique sollicitudin nibh sit. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Est velit egestas dui id ornare. Justo eget magna fermentum iaculis eu non diam phasellus. Ultrices tincidunt arcu non sodales. Ut sem nulla pharetra diam sit. Ut lectus arcu bibendum at varius. Massa sapien faucibus et molestie ac feugiat sed.`;

    const looping = new Array(str.length).fill('');
    looping.forEach((data, i) => {
      (function (ind) {
        setTimeout(function () {
          setChartData((prev) => {
            if (prev.filter((dt) => dt.id === i).length === 0) {
              const compressed = lz.compress(str.substring(0, i + 1));
              const decompressed = lz.decompress(compressed);
              return [
                ...prev,
                {
                  id: i,
                  name: `Len ${i+1} : ${Math.round(compressed.length*100/decompressed.length)}%`,
                  diff: decompressed.length - compressed.length,
                  compressed: compressed.length,
                },
              ];
            } else {
              return prev;
            }
          });
        }, 400 + 1000 * ind);
      })(i);
    });
  }, []);
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="compressed" stackId="a" fill="#82ca9d" />
          <Bar dataKey="diff" stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
