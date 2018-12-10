#!/usr/bin/python3
import time
from os import curdir, sep, path
from routes import routes
from pathlib import Path

from http.server import HTTPServer, BaseHTTPRequestHandler
from response.baseHandler import BaseHandler, BadRequestHandler, StaticHandler

HOST_NAME = 'localhost'
PORT_NUMBER = 8000

#This class will handles any incoming request from
#the browser
class Server(BaseHTTPRequestHandler):

    def do_HEAD(self):
        return

    def do_GET(self):
        split_path = path.splitext(self.path)
        request_extension = split_path[1]
        types = ["", ".html", ".css", ".js"]
        staticTypes = [".png", ".jpg", ".jpeg", ".json", ".geojson"]
        if request_extension in types:
            if self.path in routes:
                handler = BaseHandler(request_extension)
                handler.find(routes[self.path])
            else:
                handler = BadRequestHandler()
        elif request_extension in staticTypes:
            if self.path in routes:
                handler = StaticHandler(request_extension)
                handler.find(routes[self.path])
        else:
            handler = BadRequestHandler()
        self.respond({
            'handler': handler
        })

    def handle_http(self, handler):
        status_code = handler.getStatus()
        self.send_response(status_code)
        if status_code is 200:
            content = handler.getContents()
            self.send_header('Content-type', handler.getContentType())
        else:
            content = "404 Not Found"
        self.end_headers()
        if isinstance(content, (bytes, bytearray) ):
            return content
        return bytes(content, 'UTF-8')

    def respond(self, opts):
        response = self.handle_http(opts['handler'])
        self.wfile.write(response)

if __name__ == "__main__":
    #Create a web server and define the handler to manage the
    #incoming request
    server = HTTPServer((HOST_NAME, PORT_NUMBER), Server)
    print("Started httpserver on port " , PORT_NUMBER)

    try: #Wait forever for incoming htto requests
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    print('Shutting down the web server')
    server.server_close()
