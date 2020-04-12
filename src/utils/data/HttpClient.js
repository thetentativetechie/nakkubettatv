const HttpClient = {
  getLocalSiteData: async function() {
    try {
      const siteData = await require('./SiteData.json');
      return siteData;
    } catch (err) {
      console.error(err);
    }
  },
};

export default HttpClient;
