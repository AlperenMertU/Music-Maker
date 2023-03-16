let addTitle2 = document.querySelector(".metin2")
let divB = document.createElement('div')
let colB = document.querySelector('.colB')

$(document).ready(function(){
    $("#settingsB").click(function(){
      $("#equalizer2").toggle();
    });
    $("#settingsB").click(function(){
      $("#waveform2").toggleClass("active");
    });
  });


var wavesurfer2 = WaveSurfer.create({
    container: '#waveform2',
    waveColor:'dark',
    barWidth: '1',
    cursorColor: 'blue',
    height: '70',
    width:"300",
    hideScrollbar:"false",
    barGap: '-1',
    
});


//Filters
divB.style.display = "none"
divB.id = 'equalizer2'
colB.appendChild(divB)

let EQ2 = [
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

let filters2 = EQ2.map(function(band) {
    let filter = wavesurfer2.backend.ac.createBiquadFilter();
    filter.type = band.type;
    filter.gain.value = 0;
    filter.Q.value = 1;
    filter.frequency.value = band.f;
    return filter;
});

    wavesurfer2.backend.setFilters(filters2);


    // Bind filters to vertical range sliders
    filters2.forEach(function(filter) {
        let container = document.querySelector('#equalizer2');
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
        wavesurfer2.util.style(input, {
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
    wavesurfer2.filters2 = filters2;

















/////// Drag'n'drop
let toggleActive2 = function(e, toggle) {
    e.stopPropagation();
    e.preventDefault();
    toggle
        ? e.target.classList.add('wavesurfer2-dragover')
        : e.target.classList.remove('wavesurfer2-dragover');
};

let handlers2 = {
    // Drop event
    drop: function(e) {
        toggleActive2(e, false);
        addTitle2.classList.add('opacity')

        // Load the file into wavesurfer
        if (e.dataTransfer.files.length) {
            wavesurfer2.loadBlob(e.dataTransfer.files[0]);
        } else {
            wavesurfer2.fireEvent('error', 'Not a file');
        }
    },

    // Drag-over event
    dragover: function(e) {
        toggleActive2(e, true);
    },

    // Drag-leave event
    dragleave: function(e) {
        toggleActive2(e, false);
    }
};

let dropTarget2 = document.querySelector('#drop2');
Object.keys(handlers2).forEach(function(event) {
    dropTarget2.addEventListener(event, handlers2[event]);
});

// WaveSurfer with options example



wavesurfer2.on('ready', function () {
    playBtn.addEventListener('click', () => wavesurfer2.play())
})




