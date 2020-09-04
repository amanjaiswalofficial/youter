import logging.handlers
import logging

from typing import Callable


def init_logger(logger, level):

    # Creating a logger object and setting the level
    log_level = getattr(logging, level)
    logger.setLevel(log_level)

    #  Stream Handler
    stream_handler = logging.StreamHandler()

    stream_formatter = logging.Formatter(
        '%(asctime)-15s %(message)s')

    stream_handler.setFormatter(stream_formatter)

    def decorate_emit(func: callable) -> Callable:
        """
        This decorator method will add colors
        to the logs accordingly
        :param func: Emit function for stream
        :return: Function for emitting colors
        i.e. color_log
        """
        def color_log(*args: tuple) -> Callable:
            """
            This method will give
            different colors to the log.
            :param args:
            :return: function with changed colors
            """
            levelno = args[0].levelno
            if levelno >= logging.CRITICAL:
                color = '\x1b[30;1m'  # White
            elif levelno >= logging.ERROR:
                color = '\x1b[31;1m'  # Red
            elif levelno >= logging.WARNING:
                color = '\x1b[33;1m'  # Yellow
            elif levelno >= logging.INFO:
                color = '\x1b[34;1m'  # Cyan
            elif levelno >= logging.DEBUG:
                color = '\x1b[35;1m'  # Violet
            else:
                color = '\x1b[0m'  # No Color

            # add colors in the level name and message
            args[0].msg = f"{color} {args[0].msg}\x1b[0m"

            return func(*args)

        return color_log

    # Emitting colored stream
    stream_handler.emit = decorate_emit(stream_handler.emit)

    logger.addHandler(stream_handler)
    return logger


logger = logging.getLogger()
logger = init_logger(logger=logger, level="DEBUG")
