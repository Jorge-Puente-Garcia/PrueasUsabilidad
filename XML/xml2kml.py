import xml.etree.ElementTree as ET

def extraeCoordenadas(tramo):
    """Extrae las coordenadas (longitud, latitud, altitud) de un tramo y las devuelve en formato KML."""
    coordenada = tramo.find('{*}coordenada')
    longitud = coordenada.attrib['longitud']
    latitud = coordenada.attrib['latitud']
    altitud = coordenada.attrib['altitud']
    return f'{longitud},{latitud},{altitud}\n'

def prologoKML(archivo, nombre):
    """Escribe en el archivo de salida el prólogo del archivo KML."""
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name>"+nombre+"</name>\n")
    archivo.write("<LineString>\n")
    archivo.write("<extrude>1</extrude>\n")
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")

def epilogoKML(archivo):
    """Escribe en el archivo de salida el epílogo del archivo KML."""
    archivo.write("</coordinates>\n")
    archivo.write("<altitudeMode>clampToGround</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style> id='lineaRoja'>\n")
    archivo.write("<LineStyle>\n")
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")

def main():
    nombreArchivo = "circuitoEsquema.xml"

    try:
        archivo = open(nombreArchivo, 'r')
    except IOError:
        print('No se encuentra el archivo ', nombreArchivo)
        exit()

    nombreSalida = input("Introduzca el nombre del archivo generado (*.kml): ")

    try:
        salida = open(nombreSalida + ".kml", 'w')
    except IOError:
        print('No se puede crear el archivo ', nombreSalida + ".kml")
        exit()

    tree = ET.parse(archivo)
    root = tree.getroot()

    nombre_circuito = root.find('{*}nombre').text

    prologoKML(salida, nombre_circuito)

    for tramo in root.findall('.//{*}circuito/{*}tramo'):
        salida.write(extraeCoordenadas(tramo))


    epilogoKML(salida)
    archivo.close()
    salida.close()
    print(f"Archivo {nombreSalida}.kml generado con éxito.")

if __name__ == "__main__":
    main()
