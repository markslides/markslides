import slideConfigUtil from './slideConfigUtil';
import { SlideConfigState } from '@/lib/types/common';

describe('slideConfigUtil', () => {
    describe('generateMarpConfigFromSlideConfigState', () => {
        it('should generate correct Marp config from slide config state', () => {
            const mockSlideConfigState: SlideConfigState = {
                header: 'test',
                footer: '![height:40px](https://www.markslides.ai/image/credit.png)',
                title: 'TypeScript: JavaScript With Syntax For Types',
                paginate: true,
                theme: 'default',
                class: 'invert',
                size: '16:9',
            };

            const result =
                slideConfigUtil.generateMarpConfigFromSlideConfigState(
                    mockSlideConfigState
                );

            const expectedConfig = `marp: true
header: test
footer: ![height:40px](https://www.markslides.ai/image/credit.png)
title: "TypeScript: JavaScript With Syntax For Types"
paginate: true
class: invert
theme: default
size: 16:9
style: |
  pre {
    overflow: auto;
  }`;

            expect(result).toBe(expectedConfig);
        });

        it('should handle empty values correctly', () => {
            const mockSlideConfigState: SlideConfigState = {
                header: '',
                footer: '',
                title: '',
                paginate: false,
                theme: 'default',
                class: 'normal',
                size: '4:3',
            };

            const result =
                slideConfigUtil.generateMarpConfigFromSlideConfigState(
                    mockSlideConfigState
                );

            const expectedConfig = `marp: true
header: 
footer: 
title: ""
paginate: false
class: normal
theme: default
size: 4:3
style: |
  pre {
    overflow: auto;
  }`;

            expect(result).toBe(expectedConfig);
        });

        it('should handle special characters in title', () => {
            const mockSlideConfigState: SlideConfigState = {
                header: 'Test Header',
                footer: 'Test Footer',
                title: 'Title with "quotes" and special chars: @#$%',
                paginate: true,
                theme: 'default',
                class: 'normal',
                size: '16:9',
            };

            const result =
                slideConfigUtil.generateMarpConfigFromSlideConfigState(
                    mockSlideConfigState
                );

            expect(result).toContain(
                'title: "Title with "quotes" and special chars: @#$%"'
            );
            expect(result).toContain('header: Test Header');
            expect(result).toContain('footer: Test Footer');
            expect(result).toContain('paginate: true');
            expect(result).toContain('theme: default');
            expect(result).toContain('class: normal');
            expect(result).toContain('size: 16:9');
        });
    });

    describe('generateSlideConfigStateFromMarpConfig', () => {
        it('should parse basic Marp config correctly', () => {
            const marpConfig = `marp: true
header: test
footer: ![height:40px](https://www.markslides.ai/image/credit.png)
title: "TypeScript: JavaScript With Syntax For Types"
paginate: true
class: invert
theme: default
size: 16:9
style: |
  pre {
    overflow: auto;
  }`;

            const result =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfig
                );

            const expectedState: SlideConfigState = {
                header: 'test',
                footer: '![height:40px](https://www.markslides.ai/image/credit.png)',
                title: 'TypeScript: JavaScript With Syntax For Types',
                paginate: true,
                theme: 'default',
                class: 'invert',
                size: '16:9',
            };

            expect(result).toEqual(expectedState);
        });

        it('should handle title with quotes correctly', () => {
            const marpConfig = `title: "Test Title with Quotes"
theme: default
paginate: false`;

            const result =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfig
                );

            expect(result.title).toBe('Test Title with Quotes');
            expect(result.theme).toBe('default');
            expect(result.paginate).toBe(false);
        });

        it('should handle title without quotes', () => {
            const marpConfig = `title: Simple Title
theme: minimal
paginate: true`;

            const result =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfig
                );

            expect(result.title).toBe('Simple Title');
            expect(result.theme).toBe('minimal');
            expect(result.paginate).toBe(true);
        });

        it('should handle boolean paginate values correctly', () => {
            const marpConfigTrue = `paginate: true`;
            const marpConfigFalse = `paginate: false`;
            const marpConfigOther = `paginate: something`;

            const resultTrue =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfigTrue
                );
            const resultFalse =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfigFalse
                );
            const resultOther =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfigOther
                );

            expect(resultTrue.paginate).toBe(true);
            expect(resultFalse.paginate).toBe(false);
            expect(resultOther.paginate).toBe(false); // non-"true" values should be false
        });

        it('should use default values for missing properties', () => {
            const marpConfig = `marp: true
theme: default`;

            const result =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfig
                );

            // Should have default values for missing properties
            expect(result.header).toBe('');
            expect(result.footer).toBe(
                '![height:40px](https://www.markslides.ai/image/credit.png)'
            );
            expect(result.title).toBe('');
            expect(result.paginate).toBe(false);
            expect(result.theme).toBe('default'); // This was specified
            expect(result.class).toBe('normal');
            expect(result.size).toBe('16:9');
        });

        it('should handle empty config string', () => {
            const marpConfig = '';

            const result =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfig
                );

            // Should return default values
            const expectedDefault: SlideConfigState = {
                header: '',
                footer: '![height:40px](https://www.markslides.ai/image/credit.png)',
                title: '',
                paginate: false,
                theme: 'default',
                class: 'normal',
                size: '16:9',
            };

            expect(result).toEqual(expectedDefault);
        });

        it('should handle malformed config lines gracefully', () => {
            const marpConfig = `marp: true
header test without colon
footer: valid footer
title: "Valid Title"
invalid line
theme: default`;

            const result =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfig
                );

            // Should process valid lines and ignore malformed ones
            expect(result.footer).toBe('valid footer');
            expect(result.title).toBe('Valid Title');
            expect(result.theme).toBe('default');
            expect(result.header).toBe(''); // Should remain default due to malformed line
        });

        it('should handle config with extra whitespace', () => {
            const marpConfig = `  header:   test with spaces   
footer:    ![height:40px](https://www.markslides.ai/image/credit.png)   
title:   "  Title with spaces  "  
paginate:   true   
theme:   default   `;

            const result =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfig
                );

            expect(result.header).toBe('test with spaces');
            expect(result.footer).toBe(
                '![height:40px](https://www.markslides.ai/image/credit.png)'
            );
            expect(result.title).toBe('  Title with spaces  '); // Spaces inside quotes should be preserved
            expect(result.paginate).toBe(true);
            expect(result.theme).toBe('default');
        });
    });

    describe('round-trip conversion', () => {
        it('should maintain data integrity through generate -> parse cycle', () => {
            const originalState: SlideConfigState = {
                header: 'Test Header',
                footer: '![height:40px](https://www.markslides.ai/image/credit.png)',
                title: 'Test Title: With Special Characters!',
                paginate: true,
                theme: 'default',
                class: 'normal',
                size: '16:9',
            };

            // Generate Marp config from state
            const marpConfig =
                slideConfigUtil.generateMarpConfigFromSlideConfigState(
                    originalState
                );

            // Parse it back to state
            const parsedState =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfig
                );

            expect(parsedState).toEqual(originalState);
        });

        it('should handle edge case with quotes in title', () => {
            const originalState: SlideConfigState = {
                header: '',
                footer: '',
                title: 'Title with "nested quotes" here',
                paginate: false,
                theme: 'default',
                class: 'normal',
                size: '4:3',
            };

            const marpConfig =
                slideConfigUtil.generateMarpConfigFromSlideConfigState(
                    originalState
                );
            const parsedState =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfig
                );

            expect(parsedState.title).toBe(originalState.title);
        });
    });
});
