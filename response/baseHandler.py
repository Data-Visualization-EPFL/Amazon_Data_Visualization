from response.requestHandler import RequestHandler
from os import path, getcwd

ContentTypes = {
    "" : "text/html",
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpeg": "image/jpeg",
    ".json": "application/json",
    ".geojson": "application/json",
    "notfound": "text/plain"
}

class BaseHandler(RequestHandler):
    def __init__(self, type):
        super().__init__()
        self.contentType = ContentTypes[type]

    def find(self, routeData):
        try:
            template_file = open('{}'.format(routeData['template']))
            self.contents = template_file
            self.setStatus(200)
            return True
        except:
            self.setStatus(404)
            return False

class BadRequestHandler(RequestHandler):
    def __init__(self):
        super().__init__()
        self.contentType = 'text/plain'
        self.setStatus(404)

class StaticHandler(RequestHandler):
    def __init__(self, type):
        super().__init__()
        self.contentType = ContentTypes[type]

    def find(self, file_path):
        split_path = path.splitext(file_path)
        extension = split_path[1]
        try:
            if extension in (".jpg", ".jpeg", ".png", ".json", ".geojson"):
                self.contents = open(file_path, 'rb')
            else:
                self.contents = open(file_path, 'r')

            self.contentType = ContentTypes[extension]
            self.setStatus(200)
            return True
        except:
            self.contentType = ContentTypes['notfound']
            self.setStatus(404)
            return False
