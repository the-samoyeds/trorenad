Meteor.startup(function() {
  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        service: 'facebook',
        appId: '979465912116705',
        secret: '',
        loginStyle: 'popup'
      }
    }
  );

  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        service: 'google',
        clientId: '11203735036-gfsfm202oam37ut5vdng324ro8nmje3a.apps.googleusercontent.com',
        secret: ''
      }
    }
  );

});
