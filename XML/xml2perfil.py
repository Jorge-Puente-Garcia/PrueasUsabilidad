import xml.etree.ElementTree as ET

# Función para extraer las alturas de los tramos
def main():
    nombreArchivo = "circuitoEsquema.xml"

    try:
        archivo = open(nombreArchivo, 'r')
    except IOError:
        print('No se encuentra el archivo ', nombreArchivo)
        exit()
    nombreSalida = input("Introduzca el nombre del archivo generado (*.svg): ")

    try:
        salida = open(nombreSalida + ".svg", 'w')
    except IOError:
        print('No se puede crear el archivo ', nombreSalida + ".kml")
        exit()

    tree = ET.parse(nombreArchivo)
    root = tree.getroot()

    # Encontrar todos los tramos
    tramos = root.findall('.//{*}circuito/{*}tramo')
    prologoSVG(salida)
    salida.write('<polyline points="')
    distancia=0.0
    for i in range(0, len(tramos)):
        altitud = float(tramos[i].find('{*}coordenada').attrib['altitud'])
        distancia +=float(tramos[i].find('{*}distanciaTramo').attrib['distancia'])/5
        salida.write(f'{distancia},{altitud} ')
    altitud = float(tramos[0].find('{*}coordenada').attrib['altitud'])
    distancia =float(tramos[0].find('{*}distanciaTramo').attrib['distancia'])/5
    salida.write(f'{distancia},{altitud}')
    salida.write('" stroke="red" stroke-width="4" fill="white"/>\n')
    epilogoSVG(salida)

def prologoSVG(archivo):
    archivo.write('<?xml version="1.0" encoding="UTF-8" ?>\n')
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
def epilogoSVG(archivo):
    archivo.write('</svg>')
if __name__ == "__main__":
    main()