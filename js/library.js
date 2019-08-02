const storageAvailable = function(type) {
  let storage = undefined;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && ((e.code === 22) || (e.code === 1014) || (e.name === 'QuotaExceededError') || (e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) && storage && (storage.length !== 0);
  }
};

const populateStorage = function() {
  localStorage.setItem('theme', 'light-theme');
  setStyles();
};

var setStyles = function() {
  const theme = localStorage.getItem('theme');
  $('body').addClass(theme);
  if (theme === 'light-theme') {
    $('#theme-switcher-text').text('DARK');
  } else {
    $('#theme-switcher-text').text('LIGHT');
  }
};

const toggleTheme = function() {
  const theme = localStorage.getItem('theme');
  if (theme === 'light-theme') {
    localStorage.setItem('theme', 'dark-theme');
    $('body').removeClass('light-theme').addClass('dark-theme');
    $('#theme-switcher-text').text('LIGHT');
  } else {
    localStorage.setItem('theme', 'light-theme');
    $('body').removeClass('dark-theme').addClass('light-theme');
    $('#theme-switcher-text').text('DARK');
  }
};

$(document).on('turbolinks:load', function() {
    
    if (storageAvailable('localStorage')) {
        console.log('available');
        if (!localStorage.getItem('theme')) {
            populateStorage();
        } else {
            setStyles();
          }
    } else { 
        console.log('not available');
      }

    $(document).ready(function() {
        $('#collapsing-section1').click(function() {
            $('#collapsing-section1').children('.rotate90').toggleClass('on');
        });
        
        $('#collapsing-section2').click(function() {
            $('#collapsing-section2').children('.rotate90').toggleClass('on');
        });

        return $('.theme-switcher').click(function() {
            console.log('toggled');
            toggleTheme();
        });
    });
});
