SidrDirtyfix
============

I really needed this so here's a quick 'n' dirty "fix" for this issue https://github.com/artberri/sidr/issues/113

based on the original js file on http://www.berriart.com/sidr/, because that one doesn't have issues with Firefox and mobile browsers. Stripped out all the site specific cruft; this file doesn't do callbacks or the dislocation option, but I've changed it so it adds a class to the html for open-state. 
Doesn't come with any defaults either so make sure youspecify the source when initializing.
