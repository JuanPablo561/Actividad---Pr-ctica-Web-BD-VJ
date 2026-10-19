const { Router } = require('express');
const { getGameUser, updateGamePoints } = require('../controllers/game.controller');

const router = Router();

router.get('/game/:user_id', getGameUser);
router.put('/game/:user_id', updateGamePoints);

module.exports = router;
