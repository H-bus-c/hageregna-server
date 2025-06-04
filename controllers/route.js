/** @format */

const {
   models: { Route, City, Zone, Region },
} = require('../models');

exports.create = async (req, res) => {
   const data = await Route.create(req.body);
   res.json({ data });
};

exports.findAll = async (req, res) => {
   try {
      const routes = await Route.findAll({
         order: [['createdAt', 'DESC']],
      });
      const cities = await City.findAll();
      const zones = await Zone.findAll();
      const regions = await Region.findAll();
      await Promise.all([routes, cities, zones, regions]);
      let data = routes.map(route => {
         const city1 = cities.find(c => c.Id === route.city1);
         const city2 = cities.find(c => c.Id === route.city2);
         const zone1 = zones.find(c => c.Id === city1.zoneId);
         const zone2 = zones.find(c => c.Id === city2.zoneId);
         const region1 = regions.find(c => c.Id === zone1.regionId);
         const region2 = regions.find(c => c.Id === zone2.regionId);
         return ({
            Id: route.Id,
            city1: route.city1,
            city2: route.city2,
            distance: route.distance,
            duration:route.duration,
            createdAt: route.createdAt,
            updatedAt: route.updatedAt,
            statusId: 1,
            origin: city1?.name,
            destination: city2?.name,
            zone1: zone1?.name,
            zone2: zone2?.name,
            region1: region1?.name,
            region2: region2?.name,
         });
      });
      return res.json(data);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

exports.findOne = async (req, res) => {
   const id = req.params.id;
   await Route.findByPk(id)
      .then(data => res.json(data))
      .catch(err => res.json(err));
};

exports.update = async (req, res) => {
   const id = req.params.id;
   await Route.update(req.body, { where: { Id: id } })
      .then(data => res.json(data))
      .catch(err => res.json(err));
};

exports.delete = async (req, res) => {
   const id = req.params.id;
   await Route.destroy({ where: { Id: id } })
      .then(data => res.json(data))
      .catch(err => res.json(err));
};
