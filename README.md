# Generative Gestaltung in GLSL

This collection of sketches is a port of [Generative Gestaltung](https://www.amazon.com/Generative-Design-Visualize-Program-JavaScript/dp/1616897589/ref=pd_lpo_14_t_0/139-7050311-6114905?_encoding=UTF8&pd_rd_i=1616897589&pd_rd_r=2ad6ac94-860d-4f98-978f-190521263a9b&pd_rd_w=oYe0w&pd_rd_wg=Np8bH&pf_rd_p=7b36d496-f366-4631-94d3-61b87b52511b&pf_rd_r=QZ4CXZ81D04M6GBN45CK&psc=1&refRID=QZ4CXZ81D04M6GBN45CK) 
to GL Shader Language using [p5.js](https://github.com/processing/p5.js) for easy shader loading.

### What is Generative Gestaltung?

[GG](https://www.amazon.com/Generative-Design-Visualize-Program-JavaScript/dp/1616897589/ref=pd_lpo_14_t_0/139-7050311-6114905?_encoding=UTF8&pd_rd_i=1616897589&pd_rd_r=2ad6ac94-860d-4f98-978f-190521263a9b&pd_rd_w=oYe0w&pd_rd_wg=Np8bH&pf_rd_p=7b36d496-f366-4631-94d3-61b87b52511b&pf_rd_r=QZ4CXZ81D04M6GBN45CK&psc=1&refRID=QZ4CXZ81D04M6GBN45CK) 
is an incredible book on creative coding that makes it easy for anyone to get into drawing with computers.
The tasteful and escalating sketches present very cool challenges that gear the programmer
up with tools for experimenting with drawing dynamic shapes and colors on the screen. The first edition
of the book uses [Processing](https://github.com/processing/processing4) (Java) while the second edition
and [p5.js](https://github.com/processing/p5.js) (Javascript).

### What is GLSL?

Short for Graphics Library Shader Language, shaders are a tool for drawing using the GPU. Shaders are composed
of a vertex shader (handling position), and a fragment shader (handling color). [The Book of Shaders](https://thebookofshaders.com/01/) 
is the best introduction to GLSL concepts and has a great series of tutorials for a first dive. If you have never
worked with shaders before, definitely start there.

### Why use shaders with p5.js?

[P5.js](https://github.com/processing/p5.js) is a solid library with an amazing community. There are all sorts of open source projects
with the aim of introducing people to creative coding and digital visualization. This project was inspired by [this p5 shader intro](https://itp-xstory.github.io/p5js-shaders/#/./docs/continue-learning)
which draws from [this set of examples](https://itp-xstory.github.io/p5js-shaders/#/./docs/continue-learning).

# Running the sketches
From the root directory, cd into a sketch: `cd P1001`.

Run the sketch with [browser-sync](https://www.browsersync.io/): `browser-sync start --server -f -w`





