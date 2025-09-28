import { useState, useMemo, useCallback } from 'react';
import { slideConfigConst } from '@markslides/renderer';
import type { SlideTheme, SlideClass, SlideSize } from '@markslides/renderer';
import { Box } from '@markslides/ui/box';
import { Flex } from '@markslides/ui/flex';
import { Text } from '@markslides/ui/text';
import { Input } from '@markslides/ui/input';
import { Switch } from '@markslides/ui/switch';
import { Button } from '@markslides/ui/button';
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemText,
    SelectPortal,
    SelectRoot,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from '@markslides/ui/select';
import useAppSelector from '@/redux/hooks/useAppSelector';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import {
    setHeader,
    setFooter,
    setPaginate,
    setTheme,
    setClass,
    setSize,
} from '@/redux/slices/slideConfigSlice';
import useHandleSave from '@/hooks/app/useHandleSave';
import DialogBase, {
    type DialogPropsWithPayload,
} from '@/components/dialogs/DialogBase';

function SlideSettingDialog(props: DialogPropsWithPayload) {
    const { payload, onOpenChange, ...others } = props;

    const slideConfigState = useAppSelector((state) => state.slideConfig);
    const dispatch = useAppDispatch();

    const [header, _setHeader] = useState(slideConfigState.header);
    const [footer, _setFooter] = useState(slideConfigState.footer);
    const [paginate, _setPaginate] = useState(slideConfigState.paginate);
    const [theme, _setTheme] = useState(slideConfigState.theme);
    const [slideClass, _setClass] = useState(slideConfigState.class);
    const [size, _setSize] = useState(slideConfigState.size);

    const handleSave = useHandleSave();

    const handleClickApply = useCallback(() => {
        dispatch(setHeader(header));
        dispatch(setFooter(footer));
        dispatch(setPaginate(paginate));
        dispatch(setTheme(theme));
        dispatch(setClass(slideClass));
        dispatch(setSize(size));

        // TODO: Dispatch only when slide config changed by checking diff
        // dispatch(setIsContentSaved(false));

        handleSave({
            header,
            footer,
            title: slideConfigState.title,
            paginate,
            theme,
            class: slideClass,
            size,
        });
        onOpenChange(false);
    }, [
        header,
        footer,
        paginate,
        theme,
        slideClass,
        size,
        handleSave,
        onOpenChange,
        dispatch,
    ]);

    const slideClassLabel = useMemo(() => {
        const currentClass = slideConfigConst.classes.find((slideClassObj) => {
            return slideClassObj.value === slideClass;
        });

        return currentClass ? currentClass.label : 'light';
    }, [slideClass]);

    return (
        <DialogBase
            onOpenChange={onOpenChange}
            {...others}>
            <Flex
                flexDirection='column'
                gap='16px'>
                {/* Header */}
                <Flex
                    alignItems='center'
                    justifyContent='start'
                    gap='16px'>
                    <Text
                        width='96px'
                        fontSize='sm'
                        fontWeight='500'
                        color='black'>
                        Header
                    </Text>
                    <Box flex='1'>
                        <Input
                            _focus={{
                                borderColor: 'primary.500',
                            }}
                            value={header}
                            onChange={(event) => {
                                _setHeader(event.target.value);
                            }}
                        />
                    </Box>
                </Flex>

                {/* Footer */}
                <Flex
                    alignItems='center'
                    justifyContent='start'
                    gap='16px'>
                    <Text
                        width='96px'
                        fontSize='sm'
                        fontWeight='500'
                        color='black'>
                        Footer
                    </Text>
                    <Box flex='1'>
                        <Input
                            _focus={{
                                borderColor: 'primary.500',
                            }}
                            value={footer}
                            onChange={(event) => {
                                _setFooter(event.target.value);
                            }}
                        />
                    </Box>
                </Flex>

                {/* Paginate */}
                <Flex
                    alignItems='center'
                    justifyContent='start'
                    gap='16px'>
                    <Text
                        width='96px'
                        fontSize='sm'
                        fontWeight='500'
                        color='black'>
                        Paginate
                    </Text>
                    <Box flex='1'>
                        <Switch
                            // size='md'
                            // colorScheme='primary'
                            checked={paginate}
                            onCheckedChange={(checked) => {
                                _setPaginate(checked);
                            }}
                        />
                    </Box>
                </Flex>

                {/* Theme */}
                <Flex
                    alignItems='center'
                    justifyContent='start'
                    gap='16px'>
                    <Text
                        width='96px'
                        fontSize='sm'
                        fontWeight='500'
                        color='black'>
                        Slide Theme
                    </Text>
                    <SelectRoot
                        defaultValue={theme}
                        onValueChange={(value) => {
                            _setTheme(value as SlideTheme);
                        }}>
                        <SelectTrigger>
                            <SelectValue>{theme}</SelectValue>
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent>
                                <SelectViewport>
                                    {slideConfigConst.themes.map((theme) => {
                                        return (
                                            <SelectItem
                                                key={theme}
                                                value={theme}>
                                                <SelectItemText>
                                                    {theme}
                                                </SelectItemText>
                                            </SelectItem>
                                        );
                                    })}
                                </SelectViewport>
                            </SelectContent>
                        </SelectPortal>
                    </SelectRoot>
                </Flex>

                {/* Class */}
                <Flex
                    alignItems='center'
                    justifyContent='start'
                    gap='16px'>
                    <Text
                        width='96px'
                        fontSize='sm'
                        fontWeight='500'
                        color='black'>
                        Slide Mode
                    </Text>
                    <SelectRoot
                        defaultValue={slideClass}
                        onValueChange={(value) => {
                            _setClass(value as SlideClass);
                        }}>
                        <SelectTrigger>
                            <SelectValue>{slideClassLabel}</SelectValue>
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent>
                                <SelectViewport>
                                    {slideConfigConst.classes.map(
                                        (slideClassObj) => {
                                            return (
                                                <SelectItem
                                                    key={slideClassObj.label}
                                                    value={slideClassObj.value}>
                                                    <SelectItemText>
                                                        {slideClassObj.label}
                                                    </SelectItemText>
                                                </SelectItem>
                                            );
                                        }
                                    )}
                                </SelectViewport>
                            </SelectContent>
                        </SelectPortal>
                    </SelectRoot>
                </Flex>

                {/* Size */}
                <Flex
                    alignItems='center'
                    justifyContent='start'
                    gap='16px'>
                    <Text
                        width='96px'
                        fontSize='sm'
                        fontWeight='500'
                        color='black'>
                        Slide Size
                    </Text>
                    <SelectRoot
                        defaultValue={size}
                        onValueChange={(value) => {
                            _setSize(value as SlideSize);
                        }}>
                        <SelectTrigger>
                            <SelectValue>{size}</SelectValue>
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent>
                                <SelectViewport>
                                    {slideConfigConst.sizes.map((size) => {
                                        return (
                                            <SelectItem
                                                key={size}
                                                value={size}>
                                                <SelectItemText>
                                                    {size}
                                                </SelectItemText>
                                            </SelectItem>
                                        );
                                    })}
                                </SelectViewport>
                            </SelectContent>
                        </SelectPortal>
                    </SelectRoot>
                </Flex>
            </Flex>

            <Flex
                marginTop='16px'
                justifyContent='flex-end'
                gap='8px'>
                <Button onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleClickApply}>Apply</Button>
            </Flex>
        </DialogBase>
    );
}

export default SlideSettingDialog;
