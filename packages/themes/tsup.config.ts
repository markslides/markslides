import { defineConfig } from 'tsup';
import { execSync } from 'child_process';
import { watch } from 'fs';
import { join } from 'path';

// Flag to track whether CSS watching has already started
let isWatcherStarted = false;

export default defineConfig((options) => {
    return {
        entry: ['src/index.ts'],
        format: ['cjs', 'esm'],
        dts: true,
        splitting: false,
        sourcemap: true,
        clean: true,
        async onSuccess() {
            // Start CSS file watching only in watch mode (only once)
            if (options.watch && !isWatcherStarted) {
                isWatcherStarted = true;
                console.log('👀 Starting CSS file watcher...');

                const cssDir = join(process.cwd(), 'src/themes');
                let debounceTimer: NodeJS.Timeout | null = null;

                watch(cssDir, { recursive: true }, (eventType, filename) => {
                    if (filename && filename.endsWith('.css')) {
                        console.log(`🔄 CSS file ${eventType}: ${filename}`);

                        // Cancel previous timer if exists
                        if (debounceTimer) {
                            clearTimeout(debounceTimer);
                        }

                        // Execute after 500ms (batch multiple changes)
                        debounceTimer = setTimeout(() => {
                            try {
                                console.log('🎨 Regenerating themes...');
                                execSync('node scripts/generate-themes.js', {
                                    stdio: 'inherit',
                                });
                                console.log(
                                    '✅ Themes regenerated successfully'
                                );
                            } catch (error) {
                                console.error(
                                    '❌ Failed to regenerate themes:',
                                    error
                                );
                            }
                        }, 500);
                    }
                });

                console.log('✅ CSS file watcher started');
            }
        },
    };
});
