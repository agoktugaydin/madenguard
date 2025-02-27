
const express = require('express');
const router = express.Router();
const {
    saveNodesToDatabase,
    saveVerticesToDatabase,
    saveCorridorToDatabase,
    fetchNodesFromDatabase,
    fetchVerticesFromDatabase,
    fetchCorridorFromDatabase,
    saveTunnelDataToDatabase,
    getTunnelDataFromDatabase,
    removeNodeFromDatabase,
    formatCorridorData,
    removeVertexFromDatabase,
    saveNodeToDatabase,
    fetchNodeFromDatabase,
    fetchCorridorIdsFromDatabase
} = require('../controllers/tunnelController');

// Endpoint to save nodes data
router.post('/nodes', async (req, res) => {
    try {
        const nodes = req.body.nodes;
        const savedNodes = await saveNodesToDatabase(nodes);
        res.json(savedNodes);
    } catch (error) {
        console.error('Error saving nodes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to save one node 
router.post('/node', async (req, res) => {
    try {
        const node = req.body.node;
        const savedNode = await saveNodeToDatabase([node]);
        res.json(savedNode);
    } catch (error) {
        console.error('Error saving node:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch a single node
router.get('/node/:nodeId', async (req, res) => {
    try {
        const node = await fetchNodeFromDatabase(req.params.nodeId);
        res.json(node);
    } catch (error) {
        console.error('Error fetching node:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to save vertices data
router.post('/vertices', async (req, res) => {
    try {
        const vertices = req.body.vertices;
        const savedVertices = await saveVerticesToDatabase(vertices);
        res.json(savedVertices);
    } catch (error) {
        console.error('Error saving vertices:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/corridor/:tunnelId', async (req, res) => {
    try {
        const { tunnelId, cells } = formatCorridorData(req.body);
        const savedCorridor = await saveCorridorToDatabase(tunnelId, cells);
        res.json(savedCorridor); 
    } catch (error) {
        console.error('Error saving corridor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to save corridors data
router.post('/corridor', async (req, res) => {
    try {
        const { tunnelId, corridors } = req.body;
        const savedCorridors = await saveCorridorToDatabase(tunnelId, corridors);
        res.json(savedCorridors);
    } catch (error) {
        console.error('Error saving corridors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch corridor ids
router.get('/corridorIds', async (req, res) => {
    try {
        const corridorIds = await fetchCorridorIdsFromDatabase();
        res.json(corridorIds);
    } catch (error) {
        console.error('Error fetching corridors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch nodes data
router.get('/nodes', async (req, res) => {
    try {
        const nodes = await fetchNodesFromDatabase();
        res.json(nodes);
    } catch (error) {
        console.error('Error fetching nodes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch vertices data
router.get('/vertices', async (req, res) => {
    try {
        const vertices = await fetchVerticesFromDatabase();
        res.json(vertices);
    } catch (error) {
        console.error('Error fetching vertices:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// endpoint to fetch a single corridor
router.get('/corridor/:tunnelId', async (req, res) => {
    try {
        const corridors = await fetchCorridorFromDatabase(req.params.tunnelId);
        res.json(corridors);
    } catch (error) {
        console.error('Error fetching corridors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch corridors data
router.get('/corridors', async (req, res) => {
    try {
        const corridors = await fetchCorridorsFromDatabase();
        res.json(corridors);
    } catch (error) {
        console.error('Error fetching corridors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 

// Endpoint to save nodes and vertices data
router.post('/saveTunnelData', async (req, res) => {
    try {
        const tunnelData = req.body;
        const savedData = await saveTunnelDataToDatabase(tunnelData);
        res.json(savedData);
    } catch (error) {
        console.error('Error saving tunneldata:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch nodes and vertices together
router.get('/getTunnelData/:tunnelId', async (req, res) => {
    try {
        const tunnelData = await getTunnelDataFromDatabase(req.params.tunnelId);
        res.json(tunnelData);
    } catch (error) {
        console.error('Error fetching tunneldata:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to remove a node from the database
router.delete('/removeNode/:nodeId', async (req, res) => {
    try {
        const nodeId = req.params.nodeId;
        await removeNodeFromDatabase(nodeId);
        res.json({ message: `Node with ID ${nodeId} removed from the database` });
    } catch (error) {
        console.error('Error removing node:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to remove a vertex from the database
router.delete('/removeVertex/:vertexId', async (req, res) => {
    try {
        const vertexId = req.params.vertexId;
        await removeVertexFromDatabase(vertexId);
        res.json({ message: `Vertex with ID ${vertexId} removed from the database` });
    } catch (error) {
        console.error('Error removing vertex:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
