router.get('/', function(req, res) {
    const locations = ['Establishments', 'Agno Street', 'Taft Avenue', 'Leon Guinto'];
    res.render('homepage', {locations: locations});
   });
   