// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Local Development API Middleware Plugin
 * Intercepts /api/contact and /api/contact.php in `astro dev`
 * Saves inquiries to `storage/inquiries/inquiries_YYYY_MM.jsonl` and prints to console
 */
function localDevContactApiPlugin() {
  return {
    name: 'giga-mines-contact-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if ((url.startsWith('/api/contact') || url.startsWith('/api/contact.php')) && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');

              // Anti-spam honeypot
              if (data.faxNumber || data.website_url) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, trackingId: 'GM-BOT-DVT' }));
                return;
              }

              const trackingId = `GM-${Date.now().toString(16).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
              const storageDir = path.resolve(process.cwd(), 'storage/inquiries');
              if (!fs.existsSync(storageDir)) {
                fs.mkdirSync(storageDir, { recursive: true });
              }

              const now = new Date();
              const monthStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}`;
              const filePath = path.join(storageDir, `inquiries_${monthStr}.jsonl`);

              // Sanitize: strip out honeypot trap field and volume
              const { faxNumber, volume, ...cleanData } = data;

              const leadRecord = {
                trackingId,
                timestamp: now.toISOString(),
                ...cleanData,
                status: 'RECEIVED_LOCAL_DEV',
              };

              fs.appendFileSync(filePath, JSON.stringify(leadRecord) + '\n', 'utf-8');

              console.log('\n======================================================');
              console.log(`📥 [GIGA MINES LEAD CAPTURED] Tracking ID: ${trackingId}`);
              console.log(`👤 Name: ${cleanData.name} | Company: ${cleanData.company}`);
              console.log(`📧 Email: ${cleanData.email} | Phone: ${cleanData.phone}`);
              console.log(`🎯 Engagement Track: ${cleanData.role}`);
              console.log(`📝 Requirements: ${cleanData.message}`);
              console.log(`💾 Saved to: storage/inquiries/inquiries_${monthStr}.jsonl`);
              console.log('======================================================\n');

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Your partnership brief has been securely transmitted to our commercial team.',
                  trackingId,
                  lead: {
                    name: data.name,
                    company: data.company,
                    role: data.role,
                  },
                })
              );
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Malformed JSON payload' }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    server: {
      watch: {
        ignored: ['**/storage/**', '**/storage/inquiries/**', '**/*.jsonl'],
      },
    },
    plugins: [tailwindcss(), localDevContactApiPlugin()],
  },
});
