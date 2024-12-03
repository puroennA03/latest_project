import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execFile } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Increase the JSON payload limit to 10MB (or higher if needed)
app.use(express.json({ limit: '10mb' }));

// API endpoint for animal habitat search (GET)
app.get('/api/search', (req, res) => {
    const animalName = req.query.animal;

    if (!animalName) {
        return res.status(400).json({ message: "動物の名前を入力してください。" });
    }

    console.log("Executing command:", `python public/search_habitat.py ${animalName}`);
    execFile('python', ['public/search_habitat.py', animalName], { encoding: 'utf-8' }, (error, stdout, stderr) => {
        console.log("stdout:", stdout.trim());
        console.log("stderr:", stderr);
    
        if (error) {
            console.error("Execution Error:", error);
            return res.status(500).json({ message: `Python 実行エラー: ${error.message}` });
        }
        if (stderr) {
            console.error("Script Error:", stderr);
            return res.status(500).json({ message: `Python スクリプトエラー: ${stderr}` });
        }
    
        res.json({ message: stdout.trim() });
    });    
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});