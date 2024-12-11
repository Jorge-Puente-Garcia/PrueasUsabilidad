import xml.etree.ElementTree as ET

def main():
    nombreArchivo = "circuitoEsquema.xml"
    nombreSalida = "altimetria.svg"

    try:
        tree = ET.parse(nombreArchivo)
        root = tree.getroot()
    except IOError:
        print('No se encuentra el archivo', nombreArchivo)
        return

    tramos = root.findall('{*}circuito/{*}tramo')
    puntos = []

    for tramo in tramos:
        coordenada = tramo.find('{*}coordenada')
        if coordenada is not None:
            longitud = float(coordenada.attrib['longitud'])
            latitud = float(coordenada.attrib['latitud'])
            altitud = float(coordenada.attrib['altitud'])
            puntos.append((longitud, altitud))

    # Calcular las dimensiones del SVG
    ancho_svg = 800
    alto_svg = 400
    margen = 20

    # Escalado de los puntos
    min_altitud = min(altitud for _, altitud in puntos)
    max_altitud = max(altitud for _, altitud in puntos)

    # Normalizar las alturas y longitudes para el SVG
    svg_points = []
    for i, (longitud, altitud) in enumerate(puntos):
        x = margen + (i / len(puntos)) * (ancho_svg - 2 * margen)
        # Invertir el valor de altitud para que se vea bien en el SVG
        y = alto_svg - margen - ((altitud - min_altitud) / (max_altitud - min_altitud)) * (alto_svg - 2 * margen)
        svg_points.append((x, y, altitud))

    # Crear el contenido SVG
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{ancho_svg}" height="{alto_svg}">
    <title>Perfil de Altimetría del Circuito</title>
    <desc>Generado a partir del archivo {nombreArchivo}</desc>
    <rect width="100%" height="100%" fill="white"/>
    <polyline fill="none" stroke="blue" stroke-width="2" points="'''

    # Añadir los puntos al polyline
    svg_content += " ".join([f"{x},{y}" for x, y, _ in svg_points])
    svg_content += '''" />
    <g fill="red">'''

    # Añadir las etiquetas de altitud
    for x, y, altitud in svg_points:
        svg_content += f'''<text x="{x}" y="{y - 5}" font-size="10" text-anchor="middle">{altitud} m</text>'''

    svg_content += '''
    </g>
    <line x1="{margen}" y1="{alto_svg - margen}" x2="{ancho_svg - margen}" y2="{alto_svg - margen}" stroke="black" />
    <text x="{margen}" y="{alto_svg - margen + 15}" font-size="12">Longitud (Escala)</text>
    <text x="{ancho_svg - margen}" y="{alto_svg - margen + 15}" font-size="12" text-anchor="end">Altitud (m)</text>
    </svg>'''

    # Guardar el archivo SVG
    with open(nombreSalida, 'w') as f:
        f.write(svg_content)

    print(f"Archivo {nombreSalida} generado con éxito.")

if __name__ == "__main__":
    main()