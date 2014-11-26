jQuery ->
  $("a[rel~=popover], .has-popover").popover()
  $("a[rel~=tooltip], .has-tooltip").tooltip()
  $('.dropdown-menu').on('touchstart.dropdown.data-api', (e) ->
    e.stopPropagation() )
