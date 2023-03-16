let addTitle = document.querySelector(".metin")
let div = document.createElement('div')
let col = document.querySelector('.col')
const volumeSlider = document.querySelector(".slider");


$(document).ready(function(){
    $("#settings").click(function(){
      $("#equalizer").toggle();
    });
    $("#settings").click(function(){
      $("#waveform").toggleClass("active");
    });
  });




var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor:'dark',
    barWidth: '1',
    cursorColor: 'blue',
    height: '70',
    width:"300",
    hideScrollbar:"false",
    barGap: '-1',

});


div.style.display = "none"
div.id = 'equalizer'
col.appendChild(div)



let EQ = [
    {
        f: 32,
        type: 'lowshelf'
    },
    {
        f: 64,
        type: 'peaking'
    },
    {
        f: 125,
        type: 'peaking'
    },
    {
        f: 250,
        type: 'peaking'
    },
    {
        f: 500,
        type: 'peaking'
    },
    {
        f: 1000,
        type: 'peaking'
    },
    {
        f: 2000,
        type: 'peaking'
    },
    {
        f: 4000,
        type: 'peaking'
    },
    {
        f: 8000,
        type: 'peaking'
    },
    {
        f: 16000,
        type: 'highshelf'
    }
];

let filters = EQ.map(function(band) {
    let filter = wavesurfer.backend.ac.createBiquadFilter();
    filter.type = band.type;
    filter.gain.value = 0;
    filter.Q.value = 1;
    filter.frequency.value = band.f;
    return filter;
});

    wavesurfer.backend.setFilters(filters);


    // Bind filters to vertical range sliders
    filters.forEach(function(filter) {
        let container = document.querySelector('#equalizer');
        let input = document.createElement('input');
        Object.assign(input, {
            type: 'range',
            min: -40,
            max: 40,
            value: 0,
            title: filter.frequency.value
        });
        input.style.display = 'inline-block';
        input.setAttribute('orient', 'vertical');
        wavesurfer.util.style(input, {
            webkitAppearance: 'slider-vertical',
            width: '50px',
            height: '150px'
        });
        container.appendChild(input);

        let onChange = function(e) {
            filter.gain.value = ~~e.target.value;
        };

        input.addEventListener('input', onChange);
        input.addEventListener('change', onChange);
    });

    // For debugging
    wavesurfer.filters = filters;






/////// Drag'n'drop
let toggleActive = function(e, toggle) {
    e.stopPropagation();
    e.preventDefault();
    toggle
        ? e.target.classList.add('wavesurfer-dragover')
        : e.target.classList.remove('wavesurfer-dragover' || 'wavesurfer-dragover');

};

let handlers = {
    // Drop event
    drop: function(e) {
        toggleActive(e, false);
        addTitle.classList.add('opacity')

        // Load the file into wavesurfer
        if (e.dataTransfer.files.length) {
            wavesurfer.loadBlob(e.dataTransfer.files[0]);

        } else {
            wavesurfer.fireEvent('error', 'Not a file');
        }
    },

    // Drag-over event
    dragover: function(e) {
        toggleActive(e, true);


    },

    dragleave: function(e) {
        toggleActive(e, false);

    }
};

let dropTarget = document.querySelector('#drop');
Object.keys(handlers).forEach(function(event) {
    dropTarget.addEventListener(event, handlers[event]);

});





wavesurfer.on('ready', function () {
    playBtn.addEventListener('click', () => wavesurfer.play())
})




volumeSlider.addEventListener("mouseup", () => {
    changeVolume(volumeSlider.value);
  });
  
  const changeVolume = (volume) => {
    wavesurfer.setVolume(volume);
  };