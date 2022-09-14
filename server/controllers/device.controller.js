const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../model/models');
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body;
            console.log('info = ' + JSON.parse(info))
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create({ name, price, brandId, typeId, img: fileName });
            console.log('device id = ' + device.id);
            if (info) {
                console.log('start info')
                console.log(JSON.parse(info));
                // info = JSON.parse(info);

                JSON.parse(info).forEach(i =>
                    DeviceInfo.create(
                        {
                            titel: i.titel,
                            description: i.description,
                            deviceId: device.id
                        })
                )
            }
            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset });
        }
        return res.json(devices);
    }
    async getOne(req, res) {
        const { id } = req.params;
        console.log(id);
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            }
        )
        return res.json(device);
    }
}

module.exports = new DeviceController();