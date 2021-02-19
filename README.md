# LFORBIT.github.io

[LFORBIT - A visual representation of LFOs](https://limesack.github.io/LFORBIT.github.io/LFORBIT/src/index.html)

## Overview
LFOrbit is designed to function as an ambient landscape generator, that emphasizes sonic transformation through both randomness and user-controlled modulation of instruments and effects. The project is created by implementing CSound into a webpage with a focus on how one can use HTML and JavaScript in combination with CSound to create visual, creative, and interactive audio experiences.

The purpose of the project is to visualize how Low Frequency Oscillators (LFO) work, in a way that is accessible for any user independent on their background knowledge of music technology.

Sebastian's primarily focused on implementing granular synthesis and spectral processing, while Håkon build the remaining instruments. Building the webpage and mapping the parameters to the GUI was a joint effort.


## Timeline
### First week:
We started of the first week by considering what would be an interesting project for this course, what was achievable within the timeframe, and if our skills could manage to do it. Sebastian suggested that we look at mynoise.net, a soundscape generator where the user can interact with parameters that change the amplitude of each sound layer. We took inspiration from this and started to build the faders in a HTML-file, with extra parameters so the user could manipulate the sound through processing methods.


![GUI first draft](/assets/images/SlidersHtml.png)

Figure 1: User interface first draft


### Week 2:
In week 2 we realized after getting feedback on the project that what we had worked on was too similar to a plugin, and it wasn’t particularly creative or user-friendly. So, we decided to make a major overhaul to the GUI, by implementing orbiting planets as interactable parameters instead of normal sliders. While a bit abstract, it quickly became more interesting and visually pleasing, which in turn increases the target group of users.




## GUI
We decided to use a premade JavaScript project as our [graphical interface](https://medium.com/swlh/html-5-canvas-solar-system-e1e18204b123). It consists of 9 orbiting planets that vary in color, with one static planet in the middle. The reason behind using a premade graphical interface was so we could keep our main focus on the audio programming part of the project. The interface is minimalistic in the sense that each planet does not contain any parameter explanations, which encourages the user to explore for the sake of fun and curiosity.

![GUi](/assets/images/Orbit.gif)

Figure 2: Graphical User Interface of LFOrbit

## System
By combining JavaScript, HTML and WebAudio CSound we have created an interactive musical solar system called “LFOrbit”. The planets in the system orbit around a centre, and each planet is mapped to modulate different parameters in CSound. By clicking on a planet, the user can change the velocity of the planet’s movement, which in return changes the speed of the modulation.

The system functions by passing x and y coordinates of the planets from JavaScript into CSound and using them as k-rate variables there. This is done by passing data through channels from JavaScript into CSound and defining them as variables. The raw output from the coordinates themselves are not necessarily that useful for use in CSound opcodes, so we have normalized the data into reasonable values for the instruments to function correctly.


```CSound
kPlanet_6_X chnget "Planet_6_X"
kPlanet_6_XNORM = (kPlanet_6_X-563)/(1112+563)
```

Figure 2: Example of normalization of “kPlanet_6”


## Synthesis & Processing
All the sounds are generated using noise (pinker, dust2), granular synthesis (partikkel), subtractive synthesis (oscili), and Karplus-Strong synthesis (pluck) in CSound. Several of the instruments also contains a degree of randomness, such as amplitude, spreading sounds around the stereo image, and pitch.

The processing of the sounds is done using numerous techniques:
-	Granular manipulation
    - Grain length
    - Grain rate
    - Grain shape
    - Random muting of grains

-	Spectral manipulation
    - Shimmer delay (frequency and amplitude doubling)
    - Morphing between two sounds
    - Random freezing of interpolated signal
    - Spectral smoothing

-	Filter
    - Different cutoffs

-	Reverb
    - Different room sizes

## Parameters
Each parameter is mapped to several parts of the CSound code, making the parameters quite complex and hard to define through concise wording. However, the purpose behind this is a further improvement to the generative nature of the project, so that the soundscape is constantly changing.

Not all planets are used for mapping, but the ones that are used, and how they are used, is described as following:
-	Granular instrument
    - Planet 3 x-coordinates and planet 6 y together modulates the pitch of the individual grains
    - Planet 4 x-coordinates, normalized in the range 0-1 and scaled modulates grain rate
    - Planet 5 x-coordinates, normalized and scaled modulates grain length
    - Planet 2 x-coordinates modulates the random masking of singular grains
    - Planet 6 x-coordinates modulates the DRY-WET level of the reverb in the granular instrument


-	Spectral processing
    -	Normalized values from planet 2 and 7 x-coordinates modulates frequency and amplitude morphing between the grains and impulse synthesizer
    -	Planet 8 controls the spectral freeze frequency

-	Noise percussion
    -	Planet 2 x-coordinates, normalized modulates the trigger frequency of the instrument
    -	Planet 3 x-coordinates controls the reverb decay length

-	Bass synth
    -	Planet 3 x-coordinates modulates the pitch of the oscillator

-	Noise filtering instrument
    -	Planet 4 x-coordinates modulates the HP and LP filters cutoff frequency
    -	Planet 8 x-coordinates modulates the amplitude of the dry signal sent into the reverb

## Reflection
In this project we have explored new audio programming techniques through creating an interactive web page. We have learned how one can use HTML and JavaScript in combination with CSound, we have further explored granular synthesis and spectral processing, and we have explored inventive ways of mapping LFOs to parameters.

### Problems
There were some troubles using WebAudio CSound, particularly with opening audio files, but we adopted to the situation and made the necessary adjustments to our instruments to make them runnable in a browser.

### Further Improvements
There are several further improvements that can be made. Some of these are fixing audio glitches, better parameter mapping, improve planetary orbits (direction, shape, moving planets between orbits, collision), additional instruments and processing, and better mouse controls. Even though the project has its faults, we are quite happy with the result from these past two weeks.
