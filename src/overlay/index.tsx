import React from 'react';
import { View } from 'react-native';
import Style from '../style';

const ID = () => Math.random().toString(36).substr(2, 9);

const Overlay = React.forwardRef(( _: any, ref ) =>
{
    const [ overlays, setOverlays ] = React.useState([]);

    //@ts-ignore
    function removeOverlay( id )
    {
        //@ts-ignore
        setOverlays( overlays => [ ...overlays.filter( o => o.id !== id )]);
    }

    //@ts-ignore
    function createOverlay( Component, options )
    {
        const id = ID(), ref = React.createRef();

        //@ts-ignore
        setOverlays( overlays => [ ...overlays, { id, ref, component: <Component key={id} ref={ref} remove={() => removeOverlay( id )} {...options}/> }]);

        return id;
    }

    /*function removePopup( id )
    {
        setPopups([ ...popups.filter( o => o.id !== id )]);
    }

    function createPopup( Component, options )
    {
        const id = ID(), ref = React.createRef();

        setPopups([ ...popups, { id, ref, component: <Component key={id} ref={ref} remove={() => removePopup( id )} {...options}/> }]);

        return id;
    }*/

    React.useImperativeHandle( ref, () => (
    {
        /*
        //@ts-ignore
        contextMenu ( options ){ return createOverlay( ContextMenu, options )},
        //@ts-ignore
        alert       ( options ){ return createOverlay( Alert, options )},
        //@ts-ignore
        confirm     ( options ){ return createOverlay( Confirm, options )},
        //@ts-ignore
        dialog      ( options ){ return createOverlay( Dialog, options )},
        //@ts-ignore
        panel       ( options ){ return createOverlay( Panel, options )},
        //@ts-ignore
        modal       ( options ){ return createOverlay( Modal, options )},

        //toast       ( options ){ return createPopup( Toast, options )}, // TODO clickthrough modal, pravdepodobne budeme musiet toasty zobrazovat len v ramci screeny
        //snackbar    ( options ){ return createPopup( Toast, options )}, // TODO clickthrough modal, pravdepodobne budeme musiet toasty zobrazovat len v ramci screeny

        //@ts-ignore
        close( id )
        {
            //@ts-ignore
            overlays.find( o => o.id === id )?.ref?.current?.close();
        },
        */
    }));

    /*return (
        <Modal transparent visible={overlays.length > 0}>
            {//@ts-ignore
            overlays.map( overlay => overlay.component )}
        </Modal>
    );*/

    return overlays.length ? <View pointerEvents="box-none" style={[ Style.wrapper, { backgroundColor: 'rgba(0,0,0,0.25)' }]}></View> : undefined

    /*
    return (
        <>
            <RN.Modal transparent visible={overlays.length > 0}>
                {overlays.map( overlay => overlay.component )}
            </RN.Modal>
            <RN.Modal pointerEvents="none" transparent visible={popups.length > 0}>
                {popups.map( pupup => pupup.component )}
            </RN.Modal>
        </>
    );*/
});

export default Overlay;