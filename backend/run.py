from app import socket_io, app

if __name__ == "__main__":
    socket_io.run(app, use_reloader=False)
