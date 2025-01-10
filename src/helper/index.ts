export function NOOP(){ return }

export function Is( value: any )
{
    return Boolean( Array.isArray( value ) ? value.length : ( value && typeof value === 'object' ? Object.keys( value ).length : value ));
}
