# LFORBIT.github.io


[LFORBIT - A visual representation of LFOs](https://limesack.github.io/LFORBIT.github.io/LFORBIT/src/index.html)




## Overview
LFOrbit is designed to function as an ambient landscape generator, that emphasizes sonic transformation through both randomness and user-controlled modulation of instruments and effects. The project is created by implementing CSound into a webpage with a focus on how one can use HTML and JavaScript in combination with CSound to create visual, creative, and interactive audio experiences.


The purpose of the project is to visualize how Low Frequency Oscillators (LFO) work, in a way that is accessible for any user independent on their background knowledge of music technology.


Sebastian's primarily focused on implementing granular synthesis and spectral processing, while Håkon build the remaining instruments. Building the webpage and mapping the parameters to the GUI was a joint effort.




### Goals
Our goals for the project was to include CSound as a sound engine inside a external process. We chose HTML due to the possibilities regard graphical user interfaces and accessibility. Sebastian's goal for the sound engine was to further explore Granular synthesis in conjunction spectral processing (i.e. morphing, pitching and freeing amplitude and frequency content in PVS streams), and Håkon wanted to explore the nature of generative music.




## Timeline
### Week 1:
We started of the first week by considering what would be an interesting project for this course, what was achievable within the timeframe, and if our skills could manage to do it. Sebastian suggested that we look at [mynoise.net](https://mynoise.net/NoiseMachines/twinBlackLodgesSoundscapeGenerator.php), a soundscape generator where the user can interact with parameters that change the amplitude of each sound layer. We took inspiration from this and started to build the synthesis engine around the use of sliders collecting the data from a HTML-file, with extra parameters so the user could manipulate the sound through processing methods.


![GUI first draft](/assets/images/SlidersHtml.png)

Figure 1: User interface first draft




### Week 2:
During week 2 we had to redesign our approach to the user interface, and how we would implement our sound system into it. After getting feedback on the project we came to realize that using a multitude of individual sliders to control a range of parameters might be too complex for a inexperienced user, and that the system would then function better as a synthesiser VST plugin. We decided to overhaul to the GUI, by implementing orbiting planets as interactable LFO controllers instead of normal sliders. While a bit abstract, it quickly became more interesting and visually pleasing, which in turn increases the target group of users.




## GUI
We decided to use a premade JavaScript for creating a baseline [graphical interface](https://medium.com/swlh/html-5-canvas-solar-system-e1e18204b123) for our project given our inexperience with both HTML and JavaScript. Initially it consisted of 9 orbiting planets with set starting positions, velocity and no mouse interactivity. Our goal then became to add interactivity to the planets, primarily in the form of changing the velocity based on mouse movement.




### Altering the code
Using this JavaScript code, we were able to change the initial positions of the different planets independently of each other. This would allow the user to start from a new starting point each time time the program is loaded.


```JavaScript
this.radian = Math.PI * 2 * Math.random();
```


And by using by altering the second parameter in the `getPlanetForOptions` function we were also able to randomly set the starting velocity of the individual planets.


```JavaScript
planets.push(getPlanetForOptions(5, getRandomInt(5, 8), 65, 'gray')); // mercury
```


In order to retrieve the data we wanted from the GUI (i.e. X and Y coordinates) we had to develop an `Animate` function where we collected data from the animation each frame and sent it to CSound. This is the function we developed in order to do this


```JavaScript
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'rgb(0, 0, 0)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  planets.forEach(planet => {
    planet.update();
    if(typeof csound != "undefined"){
    csound.setControlChannel("Planet_0_X", planets[0].x);
    csound.setControlChannel("Planet_0_Y", planets[0].y);
    csound.setControlChannel("Planet_0_Radian", planets[0].radian);
    csound.setControlChannel("Planet_1_X", planets[1].x);
    csound.setControlChannel("Planet_1_Y", planets[1].y);
    csound.setControlChannel("Planet_1_Radian", planets[1].radian);
    etc...
    }
  });
}
```


This collects and sends the data we believed would be most useful each frame from of the animation to CSound. In its current form, only the X and Y values are used, as the radian value didn't behave in a way that proved useful for mapping our current available parameters.




### Adding Mouse interactivity
In order to add interactivity to the GUI we had to create an additional function inside the animate function. Here we defined the drag start and end points, in addition to the planet to drag. Then we collected the mouse position based on its coordinates and made the mouse pointer able to alter the velocity of the planets. Whilst a bit finnicky to use, the program is fully capable of altering the velocity of the individual planets; and even stopping them in their orbit completely.


```JavaScript
planetToDrag = null
       dragStart = [0,0]
       dragEnd = [0,0]
       dragging = false

       function getCursorPosition(canvas, event) {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      return [x,y]

   }
   canvas.addEventListener('mousedown', function(e) {
       dragStart = getCursorPosition(canvas, e)
       dragging = true;
        mouseRadius =  Math.sqrt((dragStart[0]-canvas.width / 2)**2+(dragStart[1]-canvas.height / 2)**2)

        smallesRadiusDiff = 99999
        planets.forEach(planet => {
          if (Math.abs(planet.orbitRadius-mouseRadius)<smallesRadiusDiff){
            planetToDrag = planet
            smallesRadiusDiff = Math.abs(planet.orbitRadius-mouseRadius)
          }
        })

   })
   canvas.addEventListener('mouseup', function(e) {
       dragging = false;
   })
   canvas.addEventListener('mousemove', function(e) {
     if (dragging){
       dragEnd = getCursorPosition(canvas, e)
       dist = (dragEnd[0]-dragStart[0])/10000
        planetToDrag.velocity = Math.max(planetToDrag.velocity + dist, 0.0001)
        dragStart = dragEnd;
     }
   })
```


By using a pre-existing graphical interface we could keep our main focus on the audio programming part of the project. By giving minimal information to the user, we hoped that it would further encourage exploration of the different planets and how they work together to alter some of the same parameters.


![GUi](/assets/images/Orbit.gif)

Figure 2: Graphical User Interface of LFOrbit




## System
By combining JavaScript, HTML and WebAudio CSound we have created an interactive musical solar system we've named “LFOrbit”. The planets in the system orbit around a sun, and each planet is mapped to modulate different parameters in CSound. By dragging a planet the user can change the velocity plants orbit around the centre, which in return changes the speed of the modulation in CSound.


The system functions by passing X and Y coordinates of the planets from JavaScript into CSound and using them as k-rate variables. The raw output from the coordinates themselves are not necessarily that useful for use in CSound opcodes, so we often normalized the data into reasonable values for the instruments to function correctly or scaled them accordingly.


```CSound
kPlanet_6_X chnget "Planet_6_X"
kPlanet_6_XNORM = (kPlanet_6_X-563)/(1112+563)
```

Figure 3: Example of min-max normalization of Planet_6's X coordinates for use in CSound


```CSound
kPlanet_3_Y chnget "Planet_3_Y"
kFrequency = (kPlanet_3_Y+40)/10
```

Figure 4: Example of planet value scaled for use in CSound Instrument




## Synthesis & Processing
All the sounds are generated using noise ([pinker](https://csound.com/docs/manual/pinker.html), [dust2](https://csound.com/docs/manual/dust2.html)), granular synthesis ([partikkel](https://csound.com/docs/manual/partikkel.html)), subtractive synthesis ([oscili](https://csound.com/docs/manual/oscili.html)), and Karplus-Strong synthesis ([pluck](https://csound.com/docs/manual/pluck.html)) in Csound. Our focus when programming was to create sounds for individual frequency zones to reduce masking, and to make each layer stand out from each other both in frequency and in timbre.


The sounds created from noise is a low frequent rumbling that creates a certain ambience in the soundscape. The granular synthesis is a short repeating sine tone that varies in pitch, amplitude, and length between each tone. The subtractive synthesis is a slowly decaying bass sawtooth tone that constantly changes pitch. The Karplus-Strong synthesis consists of two instruments, one replicating a guitar string, and the other a drum, where both have a certain degree of randomness that decides their amplitude, panning and pitch.




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
Several parts of the Csound code are mapped to each planet, making the results of the velocity change to each planet quite complex and hard to define through concise wording. However, the purpose behind this is a further improvement to the generative nature of the project, so that the soundscape is constantly changing. We had a focus from the start to allow the user to make drastic changes to the overall soundscape, but in the final version of our project, while the Csound parameter changes are clearly audible, they will probably not be as noticeable for a lot of users.


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
In this project we have explored new audio programming techniques through creating an interactive web page. We have learned how one can use HTML and JavaScript in combination with CSound, we have further explored granular synthesis and spectral processing alongside inventive ways of mapping LFOs to parameters.




### Personal reflections Håkon:
My personal experience with this project has been quite good, and I think we have made a good team. From the beginning, I wanted to explore ways to create generative music in CSound. I have tried different ways of randomizing parameters so that instruments have improved variation, while still somewhat maintaining its original timbre. I feel like I have accomplished this well, and I know this knowledge will be useful in future projects. A part of the project that I feel was confusing and difficult was the development of the webpage itself. While there were some useful coding examples, jumping into new programming languages was confusing and difficult for me. Overall, I think the project turned out great. I think the concept we made is unique, the soundscape is interesting, and controlling the planets function in the user-friendly way that we wanted to achieve.




### Personal reflections Sebastian:
My goals for the project were to further explore the use of granular synthesis as a source for spectral manipulation. While not as transformative as I would have liked, I am satisfied with the sound of the granular instrument in itself and while the control parameters for the planets could affect the instrument in a much more drastic way; it fulfils its purpose in the system as a whole.



The spectral processing instruments function is to provide expanded texture in conjunction with the granular instrument. It contains a few separate processes (i.e. spectral freezing, scaling, freezing, morphing and blurring), and the scaling and morphing is especially prominent in the final product; while the freezing serves as an additional controllable texture. The Scaling function creates a shimmer delay effect by feeding the pitched signal into the input of the spectral processing instrument, and by controlling this parameter with data from the planets it manifests nicely in the final result.




The spectral morphing interpolates both the frequency content and the amplitude of two different source signals (here the output from the granular synthesiser and the output from the pulse instrument). This serves as a faux reverb for the granular synthesis, and it gives the reverberation from the pulse instrument the spectral content from the tonal granular synthesis. Both the granular instrument and the spectral processing provide a huge range of parameters that can be controlled by our LFO system, something I wish we could have expanded further; and explored several sets of mappings. Given our lack of experience with JavaScript and HTML, it proved more challenging than anticipated to create the environment from where we could collect our control signals and implementing our CSound code was also more problematic than excepted.  




## Problems
There were some troubles using WebAudio CSound, particularly with opening audio files, but we adopted to the situation and made the necessary adjustments to our instruments to make them run by pure synthesis in a browser. Also given the change in control method, from a slider based system to a completely different system meant that we had to spend time implement the control system halfway through the project. Our lack of experience with JavaScript And HTML certainly didn't help with this.




The only remaining problem in the project is noisy artefacts that appear when running the code in HTLM. Having tried to eliminate this in several ways, we believe that it is caused by overloading the CSound module with input data from the animation function. Possible solutions include only updating the CSound channels by a set frequency, but this will have to be explored at a later date. As the project stands now, it will function when the planets move with low velocity.




## Further Improvements
There are several further improvements that can be made. Some of these are fixing audio glitches mentioned above, improving the voice of parameters for mapping. We also wanted to include more functionally for the planets (i.e. changing direction of orbit, change orbit shape, moving planets between orbits and collision between planets). We can only imagine how these changes would change the final sonic output of the system. We would also like to include additional instruments and processing, and we would like to improve the mouse controls. Even though the project has its faults, we are quite happy with the result from these past two weeks.




Please enjoy [LFORBIT - A visual representation of LFOs](https://limesack.github.io/LFORBIT.github.io/LFORBIT/src/index.html)
