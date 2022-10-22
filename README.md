# Stareye

Time races with two phones.

<!-- Demo Video -->
https://user-images.githubusercontent.com/50760816/197363377-cb861c58-85a2-4bf7-8429-b04d6831acda.mov

## Usage

1. Go to https://r2dev2.github.io/stareye on a device.
2. Press "Connect Device."
3. Scan the qr code using another device. You will know the devices are connected when it says "Device Paired."
4. Put each device at each endpoint. There must be no background movement seen by the camera. If there is, stareye will falsely detect movement.
5. Press "Reset Stats." This will give you a 3 second window to clear the camera's viewing area.
6. Wait for the border indicator on the info box to turn amber.

![waiting for movement](https://user-images.githubusercontent.com/50760816/197363607-55dfd069-cf89-4c9e-a972-a11b568cee0c.png)

7. Run through the course.
8. See the time taken to complete the course

![bang detected](https://user-images.githubusercontent.com/50760816/197363636-45624ae9-70e8-42c0-b9b9-adde8fe21b39.png)

## Algorithm

<!--
Graphviz code to generate graph

digraph G {
    
	subgraph cluster_0 {
		style=filled;
		color=lightgrey;
		node [style=filled,color=white];
		a0 [label="camera"]
		a1 [label="Σ(r + g + b)\nfor each pixel"]
		a2 [label="update running\nμ and σ stats"]
		a3 [label="update running\nstats on μ and σ"]
		a0 -> a1 -> a2 -> a3;
		a3 -> a0 [label="repeat every 10ms"]
		label = "calibration";
	}

	subgraph cluster_1 {
		style=filled;
		color=lightgrey;
		node [style=filled,color=white];
		b0 [label="camera"]
		b1 [label="Σ(r + g + b)\nfor each pixel"]
		b2 [label="check z score of z score\nof pixel sum"]
		b0 -> b1 -> b2
		b2->b0 [label="repeat every 10ms"]
		label = "detection";
	}
	a3->b0 [label="after 100 samples"]
    b2->end [label="  |z of z| > 2"]
    end [label="time of movement"]
}
-->

To detect motion, we take the z score of the z score of the sum of the rgb components of each pixel in the camera stream. If the magnitude of the z score of z scores is greater than 2, it is highly likely that there was movement. The two devices will then share the times at which they detected movement with each other. The time taken to complete the course is the difference between the timestamps of the devices.

A flow chart of the motion detection algorithm is below.

![flow chart](https://user-images.githubusercontent.com/50760816/197364248-e69cedda-3010-4647-873c-6e0767a8de3f.png)

## Development

### Setup

```bash
yarn
```

### Commands

```bash
yarn build # build app in production
yarn dev:livereload # start a dev server that reloads the app whenever a change is made
yarn dev:nollup # start a dev server that uses hmr to only reload changed portions of app
yarn dev:lan # start a livereload server and make it accessible on local network (useful for running on phone)
yarn dev # alias for yarn dev:nollup
yarn type:check # type-check your app
yarn type:check:watch # type-check your app whenever there is a change to source code
yarn start # serve your app locally
yarn format # format your app
yarn format:check # check your app's formatting
```

## Developers

Stareye is developed by [Ronak Badhe (r2dev2)](https://github.com/r2dev2/stareye).
